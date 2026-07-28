"use client";

import Image from "next/image";
import {
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import { designTokens } from "@/lib/design-tokens";
import { fluidFont, MOBILE_MAX_WIDTH_PX, mw, vw } from "@/lib/fluid";
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

function subscribeMobile(onStoreChange: () => void) {
  const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH_PX}px)`);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}
function getMobileSnapshot() {
  return window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH_PX}px)`).matches;
}
function getServerMobileSnapshot() {
  return false;
}

function Chevron({
  dir,
  sizeCss,
  strokeWidth = 1.35,
}: {
  dir: "left" | "right" | "up" | "down";
  sizeCss: string;
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
        width: sizeCss,
        height: sizeCss,
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
function FieldChevron({
  open,
  sizeCss,
}: {
  open: boolean;
  sizeCss: string;
}) {
  return (
    <Chevron dir={open ? "up" : "down"} sizeCss={sizeCss} strokeWidth={2.15} />
  );
}

/** 스텝용 — 시안: 90° 라인 갈매기 · 비활성은 버튼 opacity 40% */
function StepChevron({
  dir,
  widthCss,
  heightCss,
}: {
  dir: "left" | "right";
  widthCss: string;
  heightCss: string;
}) {
  return (
    <svg
      width={widthCss}
      height={heightCss}
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

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
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
  itemH,
  padX,
  fontSize,
  lineHeight,
}: {
  children: ReactNode;
  active?: boolean;
  onClick: () => void;
  itemH: string;
  padX: string;
  fontSize: string;
  lineHeight: string;
}) {
  const { weight } = designTokens;
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
        minHeight: itemH,
        padding: `0 ${padX}`,
        textAlign: "left",
        border: "none",
        cursor: "pointer",
        fontFamily: fontFamilies.sans,
        fontSize,
        fontWeight: weight.reservationDropdown,
        letterSpacing: "-0.01em",
        lineHeight,
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
  const m = designTokens.mobile;
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    getMobileSnapshot,
    getServerMobileSnapshot,
  );

  /** desktop 1440 px → vw · mobile 375 px → mw */
  const u = (dPx: number, mPx: number) => (isMobile ? mw(mPx) : vw(dPx));
  const uf = (dPx: number, mPx: number) =>
    isMobile ? mw(mPx) : fluidFont(dPx);

  const fieldChevronCss = u(
    size.reservationFieldChevron,
    m.reservationFieldChevron,
  );
  const stepChevronH = isMobile
    ? m.reservationStepChevron
    : size.reservationStepChevron;
  const stepChevronW = (stepChevronH * 12) / 20;
  const stepChevronWcss = isMobile ? mw(stepChevronW) : vw(stepChevronW);
  const stepChevronHcss = isMobile ? mw(stepChevronH) : vw(stepChevronH);

  const ddItemH = u(
    size.reservationDropdownItemH,
    m.reservationDropdownItemH,
  );
  const ddPadX = u(
    size.reservationDropdownPadX,
    m.reservationDropdownPadX,
  );
  const ddFont = uf(font.reservationDropdown, m.reservationField);
  const ddLh = u(
    size.reservationDropdownLineHeight,
    m.reservationDropdownItemH,
  );

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
    minHeight: u(size.reservationFieldH, m.reservationFieldH),
    paddingBottom: u(14, 12),
    /* 열림 시 필드 밑줄 제거 → 드롭다운 박스 상단선만 (이중선 방지) */
    borderBottom: isOpen
      ? "1px solid transparent"
      : `1px solid ${color.reservationLine}`,
    color: color.reservationFieldText,
    background: "transparent",
    cursor: "pointer",
    fontFamily: fontFamilies.sans,
    fontSize: uf(font.reservationField, m.reservationField),
    fontWeight: weight.reservationField,
    letterSpacing: "-0.01em",
    textAlign: "left",
  });

  const underlineInput: CSSProperties = {
    width: "100%",
    height: u(size.reservationFieldH, m.reservationFieldH),
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${color.reservationLine}`,
    color: color.reservationText,
    fontSize: uf(font.reservationField, m.reservationField),
    fontWeight: weight.reservationField,
    fontFamily: fontFamilies.sans,
    outline: "none",
    paddingBottom: u(12, 10),
  };

  const glassBlur = `blur(${size.reservationCalBlur}px) saturate(1.08)`;

  const serviceMenuOpen = open === "category" || open === "items";
  const today = startOfDay(new Date());

  const ddProps = {
    itemH: ddItemH,
    padX: ddPadX,
    fontSize: ddFont,
    lineHeight: ddLh,
  };

  return (
    <section
      id="reservation"
      aria-label="예약"
      className="reservation-section relative w-full"
      style={{
        height: isMobile ? "auto" : vw(size.reservationH),
        minHeight: isMobile ? 0 : 520,
        fontFamily: fontFamilies.sans,
        zIndex: menuOpen ? 40 : 1,
        isolation: "isolate",
      }}
    >
      <div
        className="reservation-inner flex w-full overflow-visible"
        style={{
          height: isMobile ? "auto" : "100%",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {/* Left visual */}
        <div
          className="reservation-visual relative overflow-hidden"
          style={{
            width: isMobile ? "100%" : "50%",
            height: isMobile ? mw(m.reservationVisualH) : "100%",
            flexShrink: 0,
          }}
        >
          <Image
            src={bgUrl}
            alt=""
            fill
            unoptimized
            sizes={isMobile ? "100vw" : "50vw"}
            className="object-cover"
            style={{ objectPosition: "42% 45%", zIndex: 0 }}
            priority={false}
          />

          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: 1 }}
          >
            {isMobile || step === 1 ? (
              <div
                className="flex flex-col"
                style={{
                  width: u(size.reservationCalW, m.reservationCalW),
                  height: u(size.reservationCalH, m.reservationCalH),
                  filter: "drop-shadow(0 16px 36px rgba(0,0,0,0.32))",
                }}
              >
                {/* Header — #3C3530 80% · 화살표↔월 50px · 비활성 40% */}
                <div
                  className="flex shrink-0 items-center justify-center"
                  style={{
                    height: u(size.reservationCalHeaderH, m.reservationCalHeaderH),
                    paddingLeft: u(size.reservationCalPadX, m.reservationCalPadX),
                    paddingRight: u(size.reservationCalPadX, m.reservationCalPadX),
                    backgroundColor: color.reservationCalHeader,
                    backdropFilter: glassBlur,
                    WebkitBackdropFilter: glassBlur,
                    borderTopLeftRadius: u(size.reservationCalRadius, m.reservationCalRadius),
                    borderTopRightRadius: u(size.reservationCalRadius, m.reservationCalRadius),
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
                            width: u(size.reservationCalArrowW, m.reservationCalArrowW),
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
                          <Chevron dir="left" sizeCss={u(16, 14)} strokeWidth={1.35} />
                        </button>

                        <div
                          className="flex flex-col items-center justify-center"
                          style={{
                            width: u(size.reservationCalMonthW, m.reservationCalMonthW),
                            flexShrink: 0,
                            gap: vw(2),
                            lineHeight: 1.15,
                            textAlign: "center",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: fontFamilies.logo,
                              fontSize: uf(font.reservationCalYear, m.reservationCalYear),
                              fontWeight: weight.reservationCalYear,
                              letterSpacing: tracking.reservationCal,
                            }}
                          >
                            {viewMonth.getFullYear()}
                          </span>
                          <span
                            style={{
                              fontFamily: fontFamilies.logo,
                              fontSize: uf(font.reservationCalMonth, m.reservationCalMonth),
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
                            width: u(size.reservationCalArrowW, m.reservationCalArrowW),
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
                          <Chevron dir="right" sizeCss={u(16, 14)} strokeWidth={1.35} />
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
                    borderBottomLeftRadius: u(size.reservationCalRadius, m.reservationCalRadius),
                    borderBottomRightRadius: u(size.reservationCalRadius, m.reservationCalRadius),
                    paddingTop: u(size.reservationCalPadTop, m.reservationCalPadTop),
                    paddingBottom: u(size.reservationCalPadBottom, m.reservationCalPadBottom),
                    paddingLeft: u(size.reservationCalPadX, m.reservationCalPadX),
                    paddingRight: u(size.reservationCalPadX, m.reservationCalPadX),
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    className="grid shrink-0 grid-cols-7"
                    style={{
                      marginBottom: u(size.reservationCalDowToDates, m.reservationCalDowToDates),
                    }}
                  >
                    {DOW.map((d) => (
                      <div
                        key={d}
                        className="flex items-center justify-center"
                        style={{
                          height: u(22, 18),
                          fontFamily: fontFamilies.logo,
                          fontSize: uf(font.reservationCalDow, m.reservationCalDow),
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
                      const isPast = startOfDay(cell.date) < today;
                      const muted = !cell.inMonth || isPast;
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
                            if (isPast && cell.inMonth) return;
                            setSelectedDate(cell.date);
                          }}
                          className="mx-auto flex items-center justify-center"
                          style={{
                            width: u(size.reservationCalDaySize, m.reservationCalDaySize),
                            height: u(size.reservationCalDaySize, m.reservationCalDaySize),
                            borderRadius: "50%",
                            border: "none",
                            cursor: muted && cell.inMonth ? "default" : "pointer",
                            background: selected
                              ? color.reservationSelected
                              : "transparent",
                            color: selected
                              ? "#FFFFFF"
                              : muted
                                ? color.reservationCalMuted
                                : isSun
                                  ? color.reservationSun
                                  : color.reservationCalText,
                            fontFamily: fontFamilies.logo,
                            fontSize: uf(font.reservationCalDay, m.reservationCalDay),
                            fontWeight: selected || !muted ? 400 : 400,
                            letterSpacing: tracking.reservationCal,
                            opacity: muted && !selected ? 0.85 : 1,
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
                  width: u(size.reservationSummaryW, m.reservationSummaryW),
                  height: u(size.reservationSummaryH, m.reservationSummaryH),
                  filter: "drop-shadow(0 16px 36px rgba(0,0,0,0.28))",
                }}
              >
                <div
                  className="flex shrink-0 items-center justify-center"
                  style={{
                    height: u(size.reservationSummaryHeaderH, m.reservationSummaryHeaderH),
                    backgroundColor: color.reservationSummaryHeader,
                    backdropFilter: glassBlur,
                    WebkitBackdropFilter: glassBlur,
                    borderTopLeftRadius: u(size.reservationSummaryRadius, m.reservationSummaryRadius),
                    borderTopRightRadius: u(size.reservationSummaryRadius, m.reservationSummaryRadius),
                    color: "#FFFFFF",
                    fontFamily: fontFamilies.logo,
                    fontSize: uf(font.reservationSummaryTitle, m.reservationSummaryTitle),
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
                    borderBottomLeftRadius: u(size.reservationSummaryRadius, m.reservationSummaryRadius),
                    borderBottomRightRadius: u(size.reservationSummaryRadius, m.reservationSummaryRadius),
                    padding: `${u(size.reservationSummaryPadY, m.reservationSummaryPadY)} ${u(size.reservationSummaryPadX, m.reservationSummaryPadX)}`,
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
                        marginBottom: u(size.reservationSummaryRowGap, m.reservationSummaryRowGap),
                        gap: vw(16),
                        lineHeight: u(size.reservationSummaryRowLh, m.reservationSummaryRowLh),
                      }}
                    >
                      <span
                        style={{
                          color: color.reservationSummaryLabel,
                          fontFamily: fontFamilies.logo,
                          fontSize: uf(font.reservationSummaryLabel, m.reservationSummaryLabel),
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
                          fontSize: uf(font.reservationSummaryValue, m.reservationSummaryValue),
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
                      marginBottom: u(size.reservationSummaryRowGap, m.reservationSummaryRowGap),
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
                        marginBottom: u(size.reservationSummaryRowGap, m.reservationSummaryRowGap),
                        gap: vw(16),
                        lineHeight: u(size.reservationSummaryRowLh, m.reservationSummaryRowLh),
                      }}
                    >
                      <span
                        style={{
                          color: color.reservationSummaryLabel,
                          fontFamily: fontFamilies.logo,
                          fontSize: uf(font.reservationSummaryLabel, m.reservationSummaryLabel),
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
                          fontSize: uf(font.reservationSummaryValue, m.reservationSummaryValue),
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
                      fontSize: uf(font.reservationSummaryNote, m.reservationSummaryNote),
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
          className="reservation-form relative flex flex-col overflow-visible"
          style={{
            width: isMobile ? "100%" : "50%",
            height: isMobile ? "auto" : "100%",
            backgroundColor: color.reservationPanelBg,
            paddingLeft: u(size.reservationSidePad, m.reservationSidePad),
            paddingRight: u(size.reservationSidePad, m.reservationSidePad),
            paddingTop: u(size.reservationTitleTop, m.reservationPadTop),
            paddingBottom: u(size.reservationPadBottom, m.reservationPadBottom),
            color: color.reservationText,
            zIndex: 2,
          }}
        >
          <div
            className="flex items-end justify-between"
            style={{ marginBottom: u(size.reservationTitleToBody, m.reservationTitleToBody) }}
          >
            <h2
              style={{
                margin: 0,
                fontFamily: fontFamilies.logo,
                fontSize: uf(font.reservationTitle, m.reservationTitle),
                fontWeight: weight.reservationTitle,
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              {isMobile ? "Booking" : "BOOKING"}
            </h2>
            {!isMobile ? (
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
                    <StepChevron
                      dir="left"
                      widthCss={stepChevronWcss}
                      heightCss={stepChevronHcss}
                    />
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
                    <StepChevron
                      dir="right"
                      widthCss={stepChevronWcss}
                      heightCss={stepChevronHcss}
                    />
                  </button>
                </span>
              </div>
            ) : null}
          </div>

          <div style={{ marginBottom: u(size.reservationBodyToFields, m.reservationBodyToFields) }}>
            <p
              style={{
                margin: 0,
                fontSize: uf(font.reservationBody, m.reservationBody),
                fontWeight: weight.reservationBody,
                lineHeight: u(size.reservationBodyLineHeight, m.reservationBodyLineHeight),
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
                    fontSize: uf(font.reservationBody, m.reservationBody),
                    lineHeight: u(size.reservationBodyLineHeight, m.reservationBodyLineHeight),
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

          {(isMobile || step === 1) && (
            <div
              className="flex flex-col overflow-visible"
              style={{
                gap: u(size.reservationFieldGap, m.reservationFieldGap),
                marginBottom: isMobile
                  ? u(size.reservationFieldGap, m.reservationFieldGap)
                  : 0,
              }}
            >
              {/* Designer */}
              <div className="relative overflow-visible" data-reservation-dd>
                <button
                  type="button"
                  style={fieldLine(open === "designer")}
                  onClick={() => toggle("designer")}
                >
                  <span>{designer?.name ?? "디자이너 선택"}</span>
                  <FieldChevron open={open === "designer"} sizeCss={fieldChevronCss} />
                </button>
                {open === "designer" ? (
                  <DropdownMenu>
                    {designers.map((d, i) => (
                      <DropdownItem
                        {...ddProps}
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
                    <FieldChevron open={serviceMenuOpen} sizeCss={fieldChevronCss} />
                  </button>
                ) : (
                  <>
                    <div
                      style={{
                        color: color.reservationFieldText,
                        fontSize: uf(font.reservationField, m.reservationField),
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
                            fontSize: uf(font.reservationField, m.reservationField),
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
                        <FieldChevron open={serviceMenuOpen} sizeCss={fieldChevronCss} />
                      </button>
                      {open === "category" ? (
                        <DropdownMenu>
                          {categories.map((c, i) => (
                            <DropdownItem
                        {...ddProps}
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
                        {...ddProps}
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
                        {...ddProps}
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
                        {...ddProps}
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
                  <FieldChevron open={open === "time"} sizeCss={fieldChevronCss} />
                </button>
                {open === "time" ? (
                  <DropdownMenu>
                    {TIME_SLOTS.map((t, i) => (
                      <DropdownItem
                        {...ddProps}
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
          )}

          {(isMobile || step === 2) && (
            <div
              className="relative flex flex-col overflow-visible"
              style={{
                gap: u(size.reservationStep2FieldGap, m.reservationStep2FieldGap),
                flex: isMobile ? undefined : 1,
              }}
            >
              <div
                className={isMobile ? "flex flex-col" : "grid grid-cols-2"}
                style={{
                  gap: isMobile
                    ? u(size.reservationFieldGap, m.reservationFieldGap)
                    : u(size.reservationStep2BlockGap, m.reservationStep2BlockGap),
                }}
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
                    fontSize: uf(font.reservationField, m.reservationField),
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
                    sizeCss={u(11, 10)}
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

              {/* 모바일 — 예약현황 (시안 HUM 07 form) */}
              {isMobile ? (
                <div
                  style={{
                    marginTop: mw(m.reservationFieldGap),
                    marginBottom: mw(8),
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      marginBottom: mw(16),
                      color: color.reservationPlaceholder,
                      fontFamily: fontFamilies.sans,
                      fontSize: mw(m.reservationField),
                      fontWeight: 400,
                      letterSpacing: "-0.01em",
                      lineHeight: 1,
                    }}
                  >
                    예약현황
                  </p>
                  {selectedDate && time && designer && services.length > 0 ? (
                    <div>
                      {(
                        [
                          ["DATE & TIME", dateTimeLabel],
                          ["ARTIST", `디자이너 ${designer.name}`],
                          ["MENU", menuLabel],
                          ["DURATION", durationLabel],
                        ] as const
                      ).map(([label, value]) => (
                        <div
                          key={label}
                          className="flex items-start justify-between"
                          style={{
                            marginBottom: mw(m.reservationSummaryRowGap),
                            gap: mw(12),
                            lineHeight: mw(m.reservationSummaryRowLh),
                          }}
                        >
                          <span
                            style={{
                              color: color.reservationText,
                              fontFamily: fontFamilies.logo,
                              fontSize: mw(m.reservationSummaryLabel),
                              fontWeight: weight.reservationSummaryLabel,
                              letterSpacing: "0.02em",
                            }}
                          >
                            {label}
                          </span>
                          <span
                            style={{
                              textAlign: "right",
                              color: color.reservationText,
                              fontFamily: fontFamilies.sans,
                              fontWeight: weight.reservationSummaryValue,
                              fontSize: mw(m.reservationSummaryValue),
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
                          borderTop: `1px solid rgba(255,255,255,0.2)`,
                          marginTop: mw(4),
                          marginBottom: mw(m.reservationSummaryRowGap),
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
                            marginBottom: mw(m.reservationSummaryRowGap),
                            gap: mw(12),
                            lineHeight: mw(m.reservationSummaryRowLh),
                          }}
                        >
                          <span
                            style={{
                              color: color.reservationText,
                              fontFamily: fontFamilies.logo,
                              fontSize: mw(m.reservationSummaryLabel),
                              fontWeight: weight.reservationSummaryLabel,
                              letterSpacing: "0.02em",
                            }}
                          >
                            {label}
                          </span>
                          <span
                            style={{
                              textAlign: "right",
                              color: color.reservationText,
                              fontFamily: fontFamilies.sans,
                              fontWeight: bold
                                ? weight.reservationSummaryValueBold
                                : weight.reservationSummaryValue,
                              fontSize: mw(m.reservationSummaryValue),
                            }}
                          >
                            {value}
                          </span>
                        </div>
                      ))}
                      <p
                        style={{
                          margin: 0,
                          marginTop: mw(8),
                          color: color.reservationPlaceholder,
                          fontFamily: fontFamilies.sans,
                          fontSize: mw(m.reservationSummaryNote),
                          fontWeight: 400,
                          lineHeight: 1.5,
                        }}
                      >
                        {REFUND_NOTE}
                      </p>
                    </div>
                  ) : (
                    <p
                      style={{
                        margin: 0,
                        color: color.reservationText,
                        fontFamily: fontFamilies.logo,
                        fontSize: mw(m.reservationField),
                        lineHeight: 1,
                      }}
                    >
                      -
                    </p>
                  )}
                </div>
              ) : null}

              <button
                type="button"
                className="reservation-cta-btn inline-flex items-center justify-between transition-colors"
                disabled={!privacyAgreed}
                style={{
                  boxSizing: "border-box",
                  marginTop: isMobile ? mw(24) : "auto",
                  width: isMobile ? "100%" : vw(size.reservationCtaW),
                  height: u(size.reservationCtaH, m.reservationCtaH),
                  minWidth: isMobile ? 0 : 200,
                  minHeight: 44,
                  paddingLeft: u(size.reservationCtaPadX, m.reservationCtaPadX),
                  paddingRight: u(size.reservationCtaPadX, m.reservationCtaPadX),
                  backgroundColor: color.reservationCtaBg,
                  color: color.reservationText,
                  fontFamily: fontFamilies.sans,
                  fontSize: uf(font.reservationCta, m.reservationCtaFont),
                  fontWeight: weight.reservationCta,
                  letterSpacing: "-0.01em",
                  border: "none",
                  borderRadius: u(size.reservationCtaRadius, m.reservationCtaRadius),
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
                <Chevron dir="right" sizeCss={u(14, 12)} strokeWidth={1.35} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
