"use client";

import Image from "next/image";
import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { designTokens } from "@/lib/design-tokens";
import { fluidFont, vw } from "@/lib/fluid";
import { fontFamilies } from "@/styles/fonts";
import type { ServiceCategory } from "@/types/content";

type Designer = { id: string; name: string };

type Props = {
  designers?: Designer[];
  categories?: ServiceCategory[];
  bgUrl: string;
};

type OpenMenu = null | "designer" | "category" | "items" | "time" | "privacy";

type SelectedService = {
  id: number;
  name: string;
  priceLabel: string;
  categoryTitle: string;
};

const MONTHS = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

const DOW = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DEFAULT_DESIGNERS: Designer[] = [
  { id: "mina", name: "미나" },
  { id: "sora", name: "소라" },
  { id: "junwoo", name: "준우" },
];

const TIME_SLOTS = ["10:00", "10:30", "11:00", "11:30", "13:00", "14:00"];

const NOTICE =
  "신중한 예약과 고객님의 소중한 시간 가치를 위해 사전 예약금이 결제됩니다.";
const BULLETS = [
  "예약금은 시술 완료 후 최종 금액에서 차감됩니다.",
  "직급 및 모량에 따라 수수료가 적용될 수 있습니다.",
];
const PRIVACY_LINES = [
  "1. 수집 항목: 이름, 연락처, 예약 시술·일정, 요청사항",
  "2. 이용 목적: 예약 확인, 시술 준비, 고객 응대",
  "3. 보유 기간: 시술 완료 후 1년 (관련 법령에 따른 경우 예외)",
  "4. 동의 거부 시 예약 서비스 이용이 제한될 수 있습니다.",
];
const REFUND_NOTE = "※ 시술 24시간 전까지 100% 환불 가능합니다.";
const DEPOSIT = 20000;

function Chevron({
  dir,
  size = 14,
  strokeWidth = 1.35,
}: {
  dir: "left" | "right" | "up" | "down";
  /** 1440 시안 기준 px */
  size?: number;
  strokeWidth?: number;
}) {
  /** 시안: 넓은 각도 · 얇은 스트로크 갈매기 */
  const d =
    dir === "left"
      ? "M15 4L8 12l7 8"
      : dir === "right"
        ? "M9 4l7 8-7 8"
        : dir === "up"
          ? "M4 15l8-7 8 7"
          : "M4 9l8 7 8-7";
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      style={{
        width: vw(size),
        height: vw(size),
        flexShrink: 0,
        display: "block",
      }}
    >
      <path
        d={d}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 필드용 — 시안2: 흰 글씨에 맞춘 ∨, 얇은 스트로크 */
function FieldChevron({ open }: { open: boolean }) {
  return (
    <Chevron
      dir={open ? "up" : "down"}
      size={designTokens.size.reservationFieldChevron}
      strokeWidth={1.35}
    />
  );
}

/** 스텝용 — 시안3: 숫자보다 큰 갈매기(~2.3×), 활성=밝고 약간 굵게 */
function StepChevron({
  dir,
  active,
}: {
  dir: "left" | "right";
  active: boolean;
}) {
  return (
    <Chevron
      dir={dir}
      size={designTokens.size.reservationStepChevron}
      strokeWidth={active ? 1.75 : 1.3}
    />
  );
}

function parsePrice(label: string): number {
  const n = Number(label.replace(/[^\d]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

/** 시안 태그 표기: 55,000 → 55.0 */
function tagPrice(label: string): string {
  const n = parsePrice(label);
  return `${(n / 1000).toFixed(1)}`;
}

function formatWon(n: number): string {
  return `${n.toLocaleString("ko-KR")}원`;
}

/** 해당 월만 채움 (5주/6주) — 시안 July는 5주 */
function buildCalendar(year: number, monthIndex: number) {
  const first = new Date(year, monthIndex, 1);
  const startDow = (first.getDay() + 6) % 7; // Mon=0
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const prevDays = new Date(year, monthIndex, 0).getDate();
  const cells: { day: number; inMonth: boolean; date: Date }[] = [];

  for (let i = 0; i < startDow; i++) {
    const day = prevDays - startDow + 1 + i;
    cells.push({
      day,
      inMonth: false,
      date: new Date(year, monthIndex - 1, day),
    });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, inMonth: true, date: new Date(year, monthIndex, d) });
  }
  while (cells.length % 7 !== 0) {
    const day = cells.length - (startDow + daysInMonth) + 1;
    cells.push({
      day,
      inMonth: false,
      date: new Date(year, monthIndex + 1, day),
    });
  }
  return cells;
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function DropdownMenu({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  const { color } = designTokens;
  return (
    <div
      role="listbox"
      className="reservation-dd-menu"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: "100%",
        /* 필드 border-bottom 과 맞붙여 한 줄만 보이게 (상단 border 없음) */
        marginTop: 0,
        width: "100%",
        borderLeft: `1px solid ${color.reservationDropdownBorder}`,
        borderRight: `1px solid ${color.reservationDropdownBorder}`,
        borderBottom: `1px solid ${color.reservationDropdownBorder}`,
        borderTop: "none",
        borderRadius: 0,
        backgroundColor: color.reservationPanelBg,
        boxSizing: "border-box",
        zIndex: 50,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function DropdownItem({
  children,
  active = false,
  onClick,
}: {
  children: ReactNode;
  active?: boolean;
  onClick: () => void;
}) {
  const { size, font } = designTokens;
  return (
    <button
      type="button"
      role="option"
      aria-selected={active}
      data-active={active ? "true" : "false"}
      className="reservation-dd-item"
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        minHeight: vw(size.reservationDropdownItemH),
        padding: `0 ${vw(size.reservationDropdownPadX)}`,
        textAlign: "left",
        border: "none",
        cursor: "pointer",
        fontFamily: fontFamilies.sans,
        fontSize: fluidFont(font.reservationDropdown),
        letterSpacing: "-0.01em",
        lineHeight: 1.35,
        boxSizing: "border-box",
      }}
    >
      {children}
    </button>
  );
}

export function ReservationSection({
  designers = DEFAULT_DESIGNERS,
  categories = [],
  bgUrl,
}: Props) {
  const { size, font, weight, color } = designTokens;

  const [step, setStep] = useState<1 | 2>(1);
  const [open, setOpen] = useState<OpenMenu>(null);
  const [viewMonth, setViewMonth] = useState(() => new Date(2026, 6, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    () => new Date(2026, 6, 30),
  );
  const [designerId, setDesignerId] = useState<string | null>(null);
  const [pendingCategoryId, setPendingCategoryId] = useState<number | null>(
    null,
  );
  const [services, setServices] = useState<SelectedService[]>([]);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [request, setRequest] = useState("");
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  const designer = designers.find((d) => d.id === designerId) ?? null;
  const pendingCategory =
    categories.find((c) => c.id === pendingCategoryId) ?? null;

  const cells = useMemo(
    () => buildCalendar(viewMonth.getFullYear(), viewMonth.getMonth()),
    [viewMonth],
  );

  const total = services.reduce((sum, s) => sum + parsePrice(s.priceLabel), 0);

  const durationLabel = useMemo(() => {
    if (!services.length) return "—";
    const mins = services.length * 75;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (m === 0) return `약 ${h}시간 소요`;
    return `약 ${h}시간 ${m}분 소요`;
  }, [services]);

  const menuLabel = useMemo(() => {
    if (!services.length) return "—";
    return services.map((s) => s.name).join(" + ");
  }, [services]);

  const dateTimeLabel = useMemo(() => {
    if (!selectedDate || !time) return "—";
    const y = selectedDate.getFullYear();
    const m = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const d = String(selectedDate.getDate()).padStart(2, "0");
    return `${y}. ${m}. ${d} / ${time}`;
  }, [selectedDate, time]);

  const menuOpen = open !== null || privacyOpen;

  const toggle = (key: OpenMenu) => {
    setPrivacyOpen(false);
    setOpen((prev) => (prev === key ? null : key));
  };

  const openServiceMenu = () => {
    setPendingCategoryId(null);
    setPrivacyOpen(false);
    setOpen((prev) =>
      prev === "category" || prev === "items" ? null : "category",
    );
  };

  const addService = (item: SelectedService) => {
    setServices((prev) =>
      prev.some((s) => s.id === item.id) ? prev : [...prev, item],
    );
    setPendingCategoryId(null);
    setOpen(null);
  };

  const removeService = (id: number) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const fieldLine: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    minHeight: vw(size.reservationFieldH),
    paddingBottom: vw(14),
    borderBottom: `1px solid ${color.reservationLine}`,
    color: color.reservationFieldText,
    background: "transparent",
    cursor: "pointer",
    fontFamily: fontFamilies.sans,
    fontSize: fluidFont(font.reservationField),
    fontWeight: weight.reservationField,
    letterSpacing: "-0.01em",
    textAlign: "left",
  };

  const underlineInput: CSSProperties = {
    width: "100%",
    height: vw(size.reservationFieldH),
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${color.reservationLine}`,
    color: color.reservationText,
    fontSize: fluidFont(font.reservationField),
    fontFamily: fontFamilies.sans,
    outline: "none",
    paddingBottom: vw(12),
  };

  const glassBlur = `blur(${size.reservationCalBlur}px) saturate(1.08)`;

  const serviceMenuOpen = open === "category" || open === "items";

  return (
    <section
      id="reservation"
      aria-label="예약"
      className="relative w-full"
      style={{
        height: vw(size.reservationH),
        minHeight: 520,
        fontFamily: fontFamilies.sans,
        zIndex: menuOpen ? 40 : 1,
        isolation: "isolate",
      }}
    >
      <div className="flex h-full w-full overflow-visible">
        {/* Left visual */}
        <div
          className="relative h-full overflow-hidden"
          style={{ width: "50%" }}
        >
          <Image
            src={bgUrl}
            alt=""
            fill
            unoptimized
            sizes="50vw"
            className="object-cover"
            style={{ objectPosition: "42% 45%", zIndex: 0 }}
            priority={false}
          />

          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: 1 }}
          >
            {step === 1 ? (
              <div
                className="flex flex-col"
                style={{
                  width: vw(size.reservationCalW),
                  height: vw(size.reservationCalH),
                  filter: "drop-shadow(0 16px 36px rgba(0,0,0,0.32))",
                }}
              >
                {/* Header — 반투명 블랙 글래스 (overflow:hidden 금지) */}
                <div
                  className="flex shrink-0 items-center justify-between"
                  style={{
                    height: vw(size.reservationCalHeaderH),
                    paddingLeft: vw(size.reservationCalPadX),
                    paddingRight: vw(size.reservationCalPadX),
                    backgroundColor: color.reservationCalHeader,
                    backdropFilter: glassBlur,
                    WebkitBackdropFilter: glassBlur,
                    borderTopLeftRadius: vw(size.reservationCalRadius),
                    borderTopRightRadius: vw(size.reservationCalRadius),
                    color: "#FFFFFF",
                  }}
                >
                  <button
                    type="button"
                    aria-label="이전 달"
                    onClick={() =>
                      setViewMonth(
                        (d) => new Date(d.getFullYear(), d.getMonth() - 1, 1),
                      )
                    }
                    className="flex items-center justify-center transition-opacity hover:opacity-60"
                    style={{
                      width: 28,
                      height: 28,
                      background: "transparent",
                      border: "none",
                      color: "#FFFFFF",
                      cursor: "pointer",
                      padding: 0,
                      flexShrink: 0,
                    }}
                  >
                    <Chevron dir="left" size={16} />
                  </button>

                  {/* 시안: 연도 / 월 2단 */}
                  <div
                    className="flex flex-col items-center justify-center"
                    style={{ gap: vw(2), lineHeight: 1.15 }}
                  >
                    <span
                      style={{
                        fontSize: fluidFont(font.reservationCalYear),
                        fontWeight: weight.reservationCalYear,
                        letterSpacing: "0.12em",
                      }}
                    >
                      {viewMonth.getFullYear()}
                    </span>
                    <span
                      style={{
                        fontSize: fluidFont(font.reservationCalMonth),
                        fontWeight: weight.reservationCalMonth,
                        letterSpacing: "0.14em",
                      }}
                    >
                      {MONTHS[viewMonth.getMonth()]}
                    </span>
                  </div>

                  <button
                    type="button"
                    aria-label="다음 달"
                    onClick={() =>
                      setViewMonth(
                        (d) => new Date(d.getFullYear(), d.getMonth() + 1, 1),
                      )
                    }
                    className="flex items-center justify-center transition-opacity hover:opacity-60"
                    style={{
                      width: 28,
                      height: 28,
                      background: "transparent",
                      border: "none",
                      color: "#FFFFFF",
                      cursor: "pointer",
                      padding: 0,
                      flexShrink: 0,
                    }}
                  >
                    <Chevron dir="right" size={16} />
                  </button>
                </div>

                {/* Body — 화이트 글래스 */}
                <div
                  className="flex min-h-0 flex-1 flex-col"
                  style={{
                    backgroundColor: color.reservationCalBody,
                    backdropFilter: glassBlur,
                    WebkitBackdropFilter: glassBlur,
                    borderBottomLeftRadius: vw(size.reservationCalRadius),
                    borderBottomRightRadius: vw(size.reservationCalRadius),
                    padding: `${vw(size.reservationCalPadY)} ${vw(size.reservationCalPadX)} ${vw(18)}`,
                  }}
                >
                  <div
                    className="grid grid-cols-7"
                    style={{ marginBottom: vw(8) }}
                  >
                    {DOW.map((d) => (
                      <div
                        key={d}
                        className="flex items-center justify-center"
                        style={{
                          height: vw(26),
                          fontSize: fluidFont(font.reservationCalDow),
                          fontWeight: 500,
                          letterSpacing: "0.02em",
                          color:
                            d === "Sun"
                              ? color.reservationSun
                              : color.reservationCalText,
                        }}
                      >
                        {d}
                      </div>
                    ))}
                  </div>

                  <div
                    className="grid flex-1 grid-cols-7"
                    style={{
                      alignContent: "space-between",
                      rowGap: vw(2),
                    }}
                  >
                    {cells.map((cell, i) => {
                      const selected =
                        !!selectedDate && sameDay(cell.date, selectedDate);
                      return (
                        <button
                          key={`${cell.date.toISOString()}-${i}`}
                          type="button"
                          onClick={() => {
                            if (!cell.inMonth) {
                              setViewMonth(
                                new Date(
                                  cell.date.getFullYear(),
                                  cell.date.getMonth(),
                                  1,
                                ),
                              );
                            }
                            setSelectedDate(cell.date);
                          }}
                          className="mx-auto flex items-center justify-center"
                          style={{
                            width: vw(size.reservationCalDaySize),
                            height: vw(size.reservationCalDaySize),
                            borderRadius: "50%",
                            border: "none",
                            cursor: "pointer",
                            background: selected
                              ? color.reservationSelected
                              : "transparent",
                            color: selected
                              ? "#FFFFFF"
                              : cell.inMonth
                                ? color.reservationCalText
                                : color.reservationCalMuted,
                            fontSize: fluidFont(font.reservationCalDay),
                            fontWeight: selected ? 600 : cell.inMonth ? 500 : 400,
                          }}
                        >
                          {cell.day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* Booking Summary — 캘린더와 동일 폭, 글래스 (overflow clip 금지) */
              <div
                className="flex flex-col"
                style={{
                  width: vw(size.reservationSummaryW),
                  filter: "drop-shadow(0 16px 36px rgba(0,0,0,0.28))",
                }}
              >
                <div
                  className="flex shrink-0 items-center justify-center"
                  style={{
                    height: vw(size.reservationSummaryHeaderH),
                    backgroundColor: color.reservationSummaryHeader,
                    backdropFilter: glassBlur,
                    WebkitBackdropFilter: glassBlur,
                    borderTopLeftRadius: vw(size.reservationSummaryRadius),
                    borderTopRightRadius: vw(size.reservationSummaryRadius),
                    color: "#FFFFFF",
                    fontSize: fluidFont(font.reservationSummaryTitle),
                    fontWeight: weight.reservationSummaryTitle,
                    letterSpacing: "0.12em",
                  }}
                >
                  BOOKING SUMMARY
                </div>
                <div
                  style={{
                    backgroundColor: color.reservationSummaryBody,
                    backdropFilter: glassBlur,
                    WebkitBackdropFilter: glassBlur,
                    borderBottomLeftRadius: vw(size.reservationSummaryRadius),
                    borderBottomRightRadius: vw(size.reservationSummaryRadius),
                    padding: `${vw(size.reservationSummaryPadY)} ${vw(size.reservationSummaryPadX)} ${vw(26)}`,
                  }}
                >
                  {(
                    [
                      ["DATE & TIME", dateTimeLabel],
                      [
                        "ARTIST",
                        designer ? `디자이너 ${designer.name}` : "—",
                      ],
                      ["MENU", menuLabel],
                      ["DURATION", durationLabel],
                    ] as const
                  ).map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-start justify-between"
                      style={{
                        marginBottom: vw(16),
                        gap: vw(16),
                      }}
                    >
                      <span
                        style={{
                          color: color.reservationSummaryLabel,
                          fontSize: fluidFont(font.reservationSummaryLabel),
                          fontWeight: weight.reservationSummaryLabel,
                          letterSpacing: "0.04em",
                        }}
                      >
                        {label}
                      </span>
                      <span
                        style={{
                          textAlign: "right",
                          color: color.reservationSummaryValue,
                          fontWeight: weight.reservationSummaryValue,
                          fontSize: fluidFont(font.reservationSummaryValue),
                          maxWidth: "62%",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}

                  <div
                    style={{
                      borderTop: `1px solid ${color.reservationSummaryDivider}`,
                      marginTop: vw(4),
                      marginBottom: vw(18),
                    }}
                  />

                  {(
                    [
                      ["TOTAL", formatWon(total || 0)],
                      ["DEPOSIT", `예약금 결제 ${formatWon(DEPOSIT)}`],
                    ] as const
                  ).map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-start justify-between"
                      style={{
                        marginBottom: vw(14),
                        gap: vw(16),
                      }}
                    >
                      <span
                        style={{
                          color: color.reservationSummaryLabel,
                          fontSize: fluidFont(font.reservationSummaryLabel),
                          fontWeight: weight.reservationSummaryLabel,
                          letterSpacing: "0.04em",
                        }}
                      >
                        {label}
                      </span>
                      <span
                        style={{
                          textAlign: "right",
                          color: color.reservationSummaryValue,
                          fontWeight: 700,
                          fontSize: fluidFont(font.reservationSummaryValue),
                        }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}

                  <p
                    style={{
                      margin: 0,
                      marginTop: vw(20),
                      color: color.reservationSummaryNote,
                      fontSize: fluidFont(font.reservationSummaryNote),
                      lineHeight: 1.55,
                    }}
                  >
                    {REFUND_NOTE}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right form */}
        <div
          className="relative flex h-full flex-col overflow-visible"
          style={{
            width: "50%",
            backgroundColor: color.reservationPanelBg,
            paddingLeft: vw(size.reservationSidePad),
            paddingRight: vw(size.reservationSidePad),
            paddingTop: vw(size.reservationTitleTop),
            paddingBottom: vw(size.reservationPadBottom),
            color: color.reservationText,
            zIndex: 2,
          }}
        >
          <div
            className="flex items-end justify-between"
            style={{ marginBottom: vw(size.reservationTitleToBody) }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: fluidFont(font.reservationTitle),
                fontWeight: weight.reservationTitle,
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              BOOKING
            </h2>
            <div
              className="flex items-center"
              style={{
                gap: vw(18),
                paddingBottom: vw(4),
                lineHeight: 1,
              }}
            >
              {/* 시안3: 01 활성 흰색 · 02 뮤트 · 갈매기 큼 · 방향별 활성색 */}
              <span
                style={{
                  fontSize: fluidFont(font.reservationStep),
                  letterSpacing: "0.04em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <span
                  style={{
                    color:
                      step === 1
                        ? color.reservationText
                        : color.reservationStepMuted,
                    fontWeight:
                      step === 1
                        ? weight.reservationStep
                        : weight.reservationStepMuted,
                  }}
                >
                  01
                </span>
                <span
                  style={{
                    color: color.reservationText,
                    fontWeight: weight.reservationStepMuted,
                    margin: `0 ${vw(6)}`,
                  }}
                >
                  /
                </span>
                <span
                  style={{
                    color:
                      step === 2
                        ? color.reservationText
                        : color.reservationStepMuted,
                    fontWeight:
                      step === 2
                        ? weight.reservationStep
                        : weight.reservationStepMuted,
                  }}
                >
                  02
                </span>
              </span>
              <span
                className="inline-flex items-center"
                style={{ gap: vw(16) }}
              >
                <button
                  type="button"
                  aria-label="이전 단계"
                  onClick={() => {
                    setStep(1);
                    setOpen(null);
                    setPrivacyOpen(false);
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    color:
                      step === 1
                        ? color.reservationStepMuted
                        : color.reservationText,
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <StepChevron dir="left" active={step === 2} />
                </button>
                <button
                  type="button"
                  aria-label="다음 단계"
                  onClick={() => {
                    setStep(2);
                    setOpen(null);
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    color:
                      step === 2
                        ? color.reservationStepMuted
                        : color.reservationText,
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <StepChevron dir="right" active={step === 1} />
                </button>
              </span>
            </div>
          </div>

          <p
            style={{
              margin: 0,
              fontSize: fluidFont(font.reservationBody),
              fontWeight: weight.reservationBody,
              lineHeight: 1.65,
              letterSpacing: "-0.01em",
            }}
          >
            {NOTICE}
          </p>
          <ul
            className="list-none"
            style={{
              margin: 0,
              marginTop: vw(14),
              marginBottom: vw(size.reservationBodyToFields),
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: vw(8),
            }}
          >
            {BULLETS.map((b) => (
              <li
                key={b}
                className="flex items-start"
                style={{
                  gap: vw(10),
                  fontSize: fluidFont(font.reservationBody),
                  lineHeight: 1.55,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    width: 5,
                    height: 5,
                    marginTop: "0.45em",
                    background: "#FFFFFF",
                  }}
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {step === 1 ? (
            <div
              className="flex flex-col overflow-visible"
              style={{ gap: vw(size.reservationFieldGap) }}
            >
              {/* Designer */}
              <div className="relative overflow-visible">
                <button
                  type="button"
                  style={fieldLine}
                  onClick={() => toggle("designer")}
                >
                  <span>{designer?.name ?? "디자이너 선택"}</span>
                  <FieldChevron open={open === "designer"} />
                </button>
                {open === "designer" ? (
                  <DropdownMenu>
                    {designers.map((d, i) => (
                      <DropdownItem
                        key={d.id}
                        active={
                          d.id === designerId ||
                          (designerId === null && i === 0)
                        }
                        onClick={() => {
                          setDesignerId(d.id);
                          setOpen(null);
                        }}
                      >
                        {d.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                ) : null}
              </div>

              {/* Services */}
              <div className="relative overflow-visible">
                {services.length === 0 ? (
                  <button
                    type="button"
                    style={fieldLine}
                    onClick={openServiceMenu}
                  >
                    <span>시술 메뉴 선택</span>
                    <FieldChevron open={serviceMenuOpen} />
                  </button>
                ) : (
                  <>
                    <div
                      style={{
                        color: color.reservationFieldText,
                        fontSize: fluidFont(font.reservationField),
                        fontWeight: weight.reservationField,
                        marginBottom: vw(12),
                        letterSpacing: "-0.01em",
                      }}
                    >
                      시술 메뉴 선택
                    </div>
                    <div
                      className="flex flex-col"
                      style={{ gap: vw(10), marginBottom: vw(14) }}
                    >
                      {services.map((s) => (
                        <span
                          key={s.id}
                          className="inline-flex items-center"
                          style={{
                            gap: vw(10),
                            color: color.reservationText,
                            fontSize: fluidFont(font.reservationField),
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {s.name}({tagPrice(s.priceLabel)})
                          <button
                            type="button"
                            aria-label={`${s.name} 삭제`}
                            onClick={() => removeService(s.id)}
                            style={{
                              background: "transparent",
                              border: "none",
                              color: "rgba(255,255,255,0.7)",
                              cursor: "pointer",
                              padding: 0,
                              fontSize: fluidFont(14),
                              lineHeight: 1,
                            }}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="relative overflow-visible">
                      <button
                        type="button"
                        style={fieldLine}
                        onClick={openServiceMenu}
                      >
                        <span>+ 시술 추가</span>
                        <FieldChevron open={serviceMenuOpen} />
                      </button>
                      {open === "category" ? (
                        <DropdownMenu>
                          {categories.map((c, i) => (
                            <DropdownItem
                              key={c.id}
                              active={i === 0}
                              onClick={() => {
                                setPendingCategoryId(c.id);
                                setOpen("items");
                              }}
                            >
                              {c.title}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      ) : null}
                      {open === "items" && pendingCategory ? (
                        <DropdownMenu>
                          {pendingCategory.items.map((item, i) => (
                            <DropdownItem
                              key={item.id}
                              active={i === 0}
                              onClick={() =>
                                addService({
                                  id: item.id,
                                  name: item.name,
                                  priceLabel: item.priceLabel,
                                  categoryTitle: pendingCategory.title,
                                })
                              }
                            >
                              {item.name}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      ) : null}
                    </div>
                  </>
                )}

                {services.length === 0 && open === "category" ? (
                  <DropdownMenu>
                    {categories.map((c, i) => (
                      <DropdownItem
                        key={c.id}
                        active={i === 0}
                        onClick={() => {
                          setPendingCategoryId(c.id);
                          setOpen("items");
                        }}
                      >
                        {c.title}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                ) : null}

                {services.length === 0 &&
                open === "items" &&
                pendingCategory ? (
                  <DropdownMenu>
                    {pendingCategory.items.map((item, i) => (
                      <DropdownItem
                        key={item.id}
                        active={i === 0}
                        onClick={() =>
                          addService({
                            id: item.id,
                            name: item.name,
                            priceLabel: item.priceLabel,
                            categoryTitle: pendingCategory.title,
                          })
                        }
                      >
                        {item.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                ) : null}
              </div>

              {/* Time */}
              <div className="relative overflow-visible">
                <button
                  type="button"
                  style={fieldLine}
                  onClick={() => toggle("time")}
                >
                  <span>{time ?? "예약 시간 선택"}</span>
                  <FieldChevron open={open === "time"} />
                </button>
                {open === "time" ? (
                  <DropdownMenu>
                    {TIME_SLOTS.map((t, i) => (
                      <DropdownItem
                        key={t}
                        active={t === time || (time === null && i === 0)}
                        onClick={() => {
                          setTime(t);
                          setOpen(null);
                        }}
                      >
                        {t}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                ) : null}
              </div>
            </div>
          ) : (
            <div
              className="relative flex flex-col overflow-visible"
              style={{ gap: vw(32), flex: 1 }}
            >
              <div className="grid grid-cols-2" style={{ gap: vw(28) }}>
                <label className="block">
                  <span className="sr-only">이름</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름"
                    style={underlineInput}
                  />
                </label>
                <label className="block">
                  <span className="sr-only">전화번호</span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="전화번호"
                    style={underlineInput}
                  />
                </label>
              </div>

              <label className="block">
                <span
                  style={{
                    display: "block",
                    marginBottom: vw(10),
                    fontSize: fluidFont(font.reservationField),
                  }}
                >
                  요청사항
                </span>
                {!request ? (
                  <span
                    style={{
                      display: "block",
                      marginBottom: vw(10),
                      color: color.reservationMuted,
                      fontSize: fluidFont(13),
                      lineHeight: 1.55,
                    }}
                  >
                    시술 전 미리 알아야 할 모발 고민이나 요청사항이 있다면
                    자유롭게 적어주세요.
                  </span>
                ) : null}
                <textarea
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                  rows={2}
                  style={{
                    ...underlineInput,
                    height: "auto",
                    minHeight: vw(52),
                    resize: "vertical",
                  }}
                />
              </label>

              <div className="relative overflow-visible">
                <button
                  type="button"
                  style={fieldLine}
                  onClick={() => {
                    setOpen(null);
                    setPrivacyOpen((v) => !v);
                  }}
                >
                  <span
                    className="inline-flex items-center"
                    style={{ gap: vw(10) }}
                  >
                    <span
                      aria-hidden
                      className="inline-flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPrivacyAgreed((v) => !v);
                      }}
                      style={{
                        width: 14,
                        height: 14,
                        border: "1px solid #FFFFFF",
                        background: privacyAgreed ? "#FFFFFF" : "transparent",
                        color: "#111111",
                        fontSize: 10,
                        lineHeight: 1,
                        flexShrink: 0,
                      }}
                    >
                      {privacyAgreed ? "✓" : ""}
                    </span>
                    개인정보 수집 및 이용 동의(필수)
                  </span>
                  <Chevron dir={privacyOpen ? "up" : "down"} size={11} strokeWidth={1.15} />
                </button>
                {privacyOpen ? (
                  <DropdownMenu
                    style={{ padding: `${vw(16)} ${vw(18)}` }}
                  >
                    {PRIVACY_LINES.map((line) => (
                      <p
                        key={line}
                        style={{
                          margin: 0,
                          marginBottom: vw(10),
                          fontSize: fluidFont(12),
                          lineHeight: 1.55,
                          color: "rgba(255,255,255,0.82)",
                        }}
                      >
                        {line}
                      </p>
                    ))}
                  </DropdownMenu>
                ) : null}
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-between transition-colors"
                disabled={!privacyAgreed}
                style={{
                  boxSizing: "border-box",
                  marginTop: "auto",
                  width: vw(size.reservationCtaW),
                  height: vw(size.reservationCtaH),
                  minWidth: 200,
                  minHeight: 44,
                  paddingLeft: vw(20),
                  paddingRight: vw(16),
                  backgroundColor: color.reservationCtaBg,
                  color: color.reservationText,
                  fontSize: fluidFont(font.reservationCta),
                  fontWeight: weight.reservationCta,
                  letterSpacing: "-0.01em",
                  border: "none",
                  borderRadius: 0,
                  cursor: privacyAgreed ? "pointer" : "not-allowed",
                  opacity: privacyAgreed ? 1 : 0.45,
                }}
                onMouseEnter={(e) => {
                  if (!privacyAgreed) return;
                  e.currentTarget.style.backgroundColor =
                    color.reservationCtaHoverBg;
                  e.currentTarget.style.color = color.reservationCtaHoverText;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    color.reservationCtaBg;
                  e.currentTarget.style.color = color.reservationText;
                }}
              >
                <span>예약 확정 및 예약금 결제</span>
                <Chevron dir="right" size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
