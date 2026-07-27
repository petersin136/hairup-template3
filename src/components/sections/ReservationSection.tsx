"use client";

import Image from "next/image";
import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
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
      strokeWidth={2.15}
    />
  );
}

/** 스텝용 — 시안: 90° 라인 갈매기 · 비활성은 버튼 opacity 40% */
function StepChevron({ dir }: { dir: "left" | "right" }) {
  const h = designTokens.size.reservationStepChevron;
  const w = (h * 12) / 20;
  return (
    <svg
      width={vw(w)}
      height={vw(h)}
      viewBox="0 0 12 20"
      fill="none"
      aria-hidden
      style={{ display: "block", flexShrink: 0 }}
    >
      <path
        d={dir === "left" ? "M10 2L2 10l8 8" : "M2 2l8 8-8 8"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />
    </svg>
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
        marginTop: 0,
        width: "100%",
        border: `1px solid ${color.reservationDropdownBorder}`,
        borderRadius: 0,
        backgroundColor: color.reservationDropdownBg,
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
  const { size, font, weight } = designTokens;
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
        fontWeight: weight.reservationDropdown,
        letterSpacing: "-0.01em",
        lineHeight: vw(size.reservationDropdownLineHeight),
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
  const { size, font, weight, color, tracking } = designTokens;

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

  /** 바깥 클릭 시 드롭다운·개인정보 패널 닫기 */
  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (target.closest("[data-reservation-dd]")) return;
      setOpen(null);
      setPrivacyOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [menuOpen]);

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

  const fieldLine = (isOpen = false): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    minHeight: vw(size.reservationFieldH),
    paddingBottom: vw(14),
    /* 열림 시 필드 밑줄 제거 → 드롭다운 박스 상단선만 (이중선 방지) */
    borderBottom: isOpen
      ? "1px solid transparent"
      : `1px solid ${color.reservationLine}`,
    color: color.reservationFieldText,
    background: "transparent",
    cursor: "pointer",
    fontFamily: fontFamilies.sans,
    fontSize: fluidFont(font.reservationField),
    fontWeight: weight.reservationField,
    letterSpacing: "-0.01em",
    textAlign: "left",
  });

  const underlineInput: CSSProperties = {
    width: "100%",
    height: vw(size.reservationFieldH),
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${color.reservationLine}`,
    color: color.reservationText,
    fontSize: fluidFont(font.reservationField),
    fontWeight: weight.reservationField,
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
                {/* Header — #3C3530 80% · 화살표↔월 50px · 비활성 40% */}
                <div
                  className="flex shrink-0 items-center justify-center"
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
                  {(() => {
                    const now = new Date();
                    const minMonth = new Date(
                      now.getFullYear(),
                      now.getMonth(),
                      1,
                    );
                    const atMin =
                      viewMonth.getFullYear() < minMonth.getFullYear() ||
                      (viewMonth.getFullYear() === minMonth.getFullYear() &&
                        viewMonth.getMonth() <= minMonth.getMonth());
                    return (
                      <>
                        <button
                          type="button"
                          aria-label="이전 달"
                          aria-disabled={atMin}
                          disabled={atMin}
                          onClick={() =>
                            setViewMonth(
                              (d) =>
                                new Date(d.getFullYear(), d.getMonth() - 1, 1),
                            )
                          }
                          className="flex items-center justify-center"
                          style={{
                            boxSizing: "border-box",
                            width: vw(size.reservationCalArrowW),
                            height: "100%",
                            margin: 0,
                            background: "transparent",
                            border: "none",
                            color: "#FFFFFF",
                            opacity: atMin ? 0.4 : 1,
                            cursor: atMin ? "default" : "pointer",
                            padding: 0,
                            flexShrink: 0,
                          }}
                        >
                          <Chevron dir="left" size={16} strokeWidth={1.35} />
                        </button>

                        <div
                          className="flex flex-col items-center justify-center"
                          style={{
                            width: vw(size.reservationCalMonthW),
                            flexShrink: 0,
                            gap: vw(2),
                            lineHeight: 1.15,
                            textAlign: "center",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: fontFamilies.logo,
                              fontSize: fluidFont(font.reservationCalYear),
                              fontWeight: weight.reservationCalYear,
                              letterSpacing: tracking.reservationCal,
                            }}
                          >
                            {viewMonth.getFullYear()}
                          </span>
                          <span
                            style={{
                              fontFamily: fontFamilies.logo,
                              fontSize: fluidFont(font.reservationCalMonth),
                              fontWeight: weight.reservationCalMonth,
                              letterSpacing: tracking.reservationCal,
                              whiteSpace: "nowrap",
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
                              (d) =>
                                new Date(d.getFullYear(), d.getMonth() + 1, 1),
                            )
                          }
                          className="flex items-center justify-center"
                          style={{
                            boxSizing: "border-box",
                            width: vw(size.reservationCalArrowW),
                            height: "100%",
                            margin: 0,
                            background: "transparent",
                            border: "none",
                            color: "#FFFFFF",
                            cursor: "pointer",
                            padding: 0,
                            flexShrink: 0,
                          }}
                        >
                          <Chevron dir="right" size={16} strokeWidth={1.35} />
                        </button>
                      </>
                    );
                  })()}
                </div>

                {/* Body — 화이트 글래스 · 하단 여백 확보 */}
                <div
                  className="flex min-h-0 flex-1 flex-col"
                  style={{
                    backgroundColor: color.reservationCalBody,
                    backdropFilter: glassBlur,
                    WebkitBackdropFilter: glassBlur,
                    borderBottomLeftRadius: vw(size.reservationCalRadius),
                    borderBottomRightRadius: vw(size.reservationCalRadius),
                    paddingTop: vw(size.reservationCalPadTop),
                    paddingBottom: vw(size.reservationCalPadBottom),
                    paddingLeft: vw(size.reservationCalPadX),
                    paddingRight: vw(size.reservationCalPadX),
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    className="grid shrink-0 grid-cols-7"
                    style={{
                      marginBottom: vw(size.reservationCalDowToDates),
                    }}
                  >
                    {DOW.map((d) => (
                      <div
                        key={d}
                        className="flex items-center justify-center"
                        style={{
                          height: vw(22),
                          fontFamily: fontFamilies.logo,
                          fontSize: fluidFont(font.reservationCalDow),
                          fontWeight: 400,
                          letterSpacing: tracking.reservationCal,
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

                  {/* 행을 영역 안에 균등 분배 → 마지막 줄이 바닥에 붙지 않음 */}
                  <div
                    className="grid min-h-0 flex-1 grid-cols-7"
                    style={{
                      alignContent: "space-between",
                    }}
                  >
                    {cells.map((cell, i) => {
                      const selected =
                        !!selectedDate && sameDay(cell.date, selectedDate);
                      const isSun = cell.date.getDay() === 0;
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
                              : !cell.inMonth
                                ? color.reservationCalMuted
                                : isSun
                                  ? color.reservationSun
                                  : color.reservationCalText,
                            fontFamily: fontFamilies.logo,
                            fontSize: fluidFont(font.reservationCalDay),
                            fontWeight: 400,
                            letterSpacing: tracking.reservationCal,
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
              /* Booking Summary — 430×408 · 헤더 83 · #3C3530 80% / 흰 80% */
              <div
                className="flex flex-col"
                style={{
                  width: vw(size.reservationSummaryW),
                  height: vw(size.reservationSummaryH),
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
                    fontFamily: fontFamilies.logo,
                    fontSize: fluidFont(font.reservationSummaryTitle),
                    fontWeight: weight.reservationSummaryTitle,
                    letterSpacing: "0.06em",
                  }}
                >
                  BOOKING SUMMARY
                </div>
                <div
                  className="flex min-h-0 flex-1 flex-col"
                  style={{
                    backgroundColor: color.reservationSummaryBody,
                    backdropFilter: glassBlur,
                    WebkitBackdropFilter: glassBlur,
                    borderBottomLeftRadius: vw(size.reservationSummaryRadius),
                    borderBottomRightRadius: vw(size.reservationSummaryRadius),
                    padding: `${vw(size.reservationSummaryPadY)} ${vw(size.reservationSummaryPadX)}`,
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
                        marginBottom: vw(size.reservationSummaryRowGap),
                        gap: vw(16),
                        lineHeight: vw(size.reservationSummaryRowLh),
                      }}
                    >
                      <span
                        style={{
                          color: color.reservationSummaryLabel,
                          fontFamily: fontFamilies.logo,
                          fontSize: fluidFont(font.reservationSummaryLabel),
                          fontWeight: weight.reservationSummaryLabel,
                          letterSpacing: "0.02em",
                        }}
                      >
                        {label}
                      </span>
                      <span
                        style={{
                          textAlign: "right",
                          color: color.reservationSummaryValue,
                          fontFamily: fontFamilies.sans,
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
                      marginBottom: vw(size.reservationSummaryRowGap),
                    }}
                  />

                  {(
                    [
                      ["TOTAL", formatWon(total || 0), false],
                      [
                        "DEPOSIT",
                        `예약금 결제 ${formatWon(DEPOSIT)}`,
                        true,
                      ],
                    ] as const
                  ).map(([label, value, bold]) => (
                    <div
                      key={label}
                      className="flex items-start justify-between"
                      style={{
                        marginBottom: vw(size.reservationSummaryRowGap),
                        gap: vw(16),
                        lineHeight: vw(size.reservationSummaryRowLh),
                      }}
                    >
                      <span
                        style={{
                          color: color.reservationSummaryLabel,
                          fontFamily: fontFamilies.logo,
                          fontSize: fluidFont(font.reservationSummaryLabel),
                          fontWeight: weight.reservationSummaryLabel,
                          letterSpacing: "0.02em",
                        }}
                      >
                        {label}
                      </span>
                      <span
                        style={{
                          textAlign: "right",
                          color: color.reservationSummaryValue,
                          fontFamily: fontFamilies.sans,
                          fontWeight: bold
                            ? weight.reservationSummaryValueBold
                            : weight.reservationSummaryValue,
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
                      marginTop: "auto",
                      color: color.reservationSummaryNote,
                      fontFamily: fontFamilies.sans,
                      fontSize: fluidFont(font.reservationSummaryNote),
                      fontWeight: 400,
                      lineHeight: 1.5,
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
                fontFamily: fontFamilies.logo,
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
                gap: vw(24),
                paddingBottom: vw(4),
                lineHeight: 1,
              }}
            >
              {/* 시안: 01 흰색 · / 02 #7D7D7D · Poppins Regular 12 */}
              <span
                style={{
                  fontFamily: fontFamilies.logo,
                  fontSize: fluidFont(font.reservationStep),
                  fontWeight: weight.reservationStep,
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
                  }}
                >
                  01
                </span>
                <span
                  style={{
                    color: color.reservationStepMuted,
                    margin: `0 ${vw(4)}`,
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
                  }}
                >
                  02
                </span>
              </span>
              <span
                className="inline-flex items-center"
                style={{ gap: vw(26) }}
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
                    color: color.reservationText,
                    opacity: step === 1 ? 0.4 : 1,
                    cursor: step === 1 ? "default" : "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <StepChevron dir="left" />
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
                    color: color.reservationText,
                    opacity: step === 2 ? 0.4 : 1,
                    cursor: step === 2 ? "default" : "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <StepChevron dir="right" />
                </button>
              </span>
            </div>
          </div>

          <div style={{ marginBottom: vw(size.reservationBodyToFields) }}>
            <p
              style={{
                margin: 0,
                fontSize: fluidFont(font.reservationBody),
                fontWeight: weight.reservationBody,
                lineHeight: vw(size.reservationBodyLineHeight),
                letterSpacing: "-0.01em",
              }}
            >
              {NOTICE}
            </p>
            <ul
              className="list-none"
              style={{
                margin: 0,
                marginTop: vw(10),
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: vw(4),
              }}
            >
              {BULLETS.map((b) => (
                <li
                  key={b}
                  className="flex items-center"
                  style={{
                    gap: vw(10),
                    fontSize: fluidFont(font.reservationBody),
                    lineHeight: vw(size.reservationBodyLineHeight),
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      flexShrink: 0,
                      width: vw(5),
                      height: vw(5),
                      background: "#FFFFFF",
                    }}
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {step === 1 ? (
            <div
              className="flex flex-col overflow-visible"
              style={{ gap: vw(size.reservationFieldGap) }}
            >
              {/* Designer */}
              <div className="relative overflow-visible" data-reservation-dd>
                <button
                  type="button"
                  style={fieldLine(open === "designer")}
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
              <div className="relative overflow-visible" data-reservation-dd>
                {services.length === 0 ? (
                  <button
                    type="button"
                    style={fieldLine(serviceMenuOpen)}
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
                        style={fieldLine(serviceMenuOpen)}
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
              <div className="relative overflow-visible" data-reservation-dd>
                <button
                  type="button"
                  style={fieldLine(open === "time")}
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
              style={{ gap: vw(size.reservationStep2FieldGap), flex: 1 }}
            >
              <div
                className="grid grid-cols-2"
                style={{ gap: vw(size.reservationStep2BlockGap) }}
              >
                <label className="block">
                  <span className="sr-only">이름</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="이름"
                    className="reservation-underline-input"
                    style={underlineInput}
                  />
                </label>
                <label className="block">
                  <span className="sr-only">전화번호</span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="전화번호"
                    className="reservation-underline-input"
                    style={underlineInput}
                  />
                </label>
              </div>

              <label className="block">
                <span
                  style={{
                    display: "block",
                    marginBottom: vw(12),
                    fontSize: fluidFont(font.reservationField),
                    fontWeight: weight.reservationField,
                    color: color.reservationText,
                  }}
                >
                  요청사항
                </span>
                <textarea
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                  rows={1}
                  placeholder="시술 전 미리 알아야 할 모발 고민이나 요청사항이 있다면 자유롭게 적어주세요."
                  className="reservation-underline-input reservation-request-input"
                  style={{
                    ...underlineInput,
                    height: "auto",
                    minHeight: vw(size.reservationFieldH),
                    resize: "none",
                    lineHeight: 1.45,
                    overflow: "hidden",
                    letterSpacing: "-0.02em",
                  }}
                />
              </label>

              <div
                className="relative overflow-visible"
                data-reservation-dd
                style={{ marginTop: vw(15) }}
              >
                <button
                  type="button"
                  style={{
                    ...fieldLine(privacyOpen),
                    color: privacyAgreed
                      ? color.reservationText
                      : color.reservationPlaceholder,
                  }}
                  onClick={() => {
                    setOpen(null);
                    setPrivacyOpen((v) => !v);
                  }}
                >
                  <span
                    className="inline-flex items-center"
                    style={{ gap: vw(12) }}
                  >
                    <span
                      aria-hidden
                      className="inline-flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPrivacyAgreed((v) => !v);
                      }}
                      style={{
                        boxSizing: "border-box",
                        width: vw(16),
                        height: vw(16),
                        border: `1px solid ${color.reservationText}`,
                        background: privacyAgreed
                          ? color.reservationCheckBg
                          : "transparent",
                        color: color.reservationCheckMark,
                        fontSize: fluidFont(11),
                        lineHeight: 1,
                        flexShrink: 0,
                      }}
                    >
                      {privacyAgreed ? "✓" : ""}
                    </span>
                    개인정보 수집 및 이용 동의(필수)
                  </span>
                  <Chevron
                    dir={privacyOpen ? "up" : "down"}
                    size={11}
                    strokeWidth={1.15}
                  />
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
                  paddingLeft: vw(size.reservationCtaPadX),
                  paddingRight: vw(size.reservationCtaPadX),
                  backgroundColor: color.reservationCtaBg,
                  color: color.reservationText,
                  fontFamily: fontFamilies.sans,
                  fontSize: fluidFont(font.reservationCta),
                  fontWeight: weight.reservationCta,
                  letterSpacing: "-0.01em",
                  border: "none",
                  borderRadius: vw(size.reservationCtaRadius),
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
                <Chevron dir="right" size={14} strokeWidth={1.35} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
