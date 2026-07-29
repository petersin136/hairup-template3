/**
 * Design tokens — 1440px desktop 시안 기준
 * 폰트/컬러 교체 시 이 파일과 styles/fonts.ts 만 수정
 */
export const designTokens = {
  canvas: {
    width: 1440,
  },
  color: {
    white: "#FFFFFF",
    black: "#000000",
    /** 모바일 시안 실측 · 데스크탑과 동일 계열 */
    announcementBg: "#3C3530",
    /** GNB — 시안 수정사항: active #000 / inactive #919191 */
    navActive: "#000000",
    navInactive: "#919191",
    /** CTA — 시안 #111111 / hover #363636 */
    ctaBg: "#111111",
    ctaHover: "#363636",
    ctaText: "#FFFFFF",
    aboutEyebrow: "#111111",
    aboutTitle: "#111111",
    aboutBody: "#444444",
    aboutMuted: "#444444",
    aboutLine: "#111111",
    /** Brand ticker — 시안 #F7F4EF · H 150 */
    brandTickerBg: "#F7F4EF",
    /** Services — 시안 크림 배경 */
    servicesBg: "#F7F4EF",
    servicesEyebrow: "#111111",
    servicesMuted: "#444444",
    servicesNav: "#444444",
    servicesNote: "#919191",
    servicesCtaText: "#F4EEEE",
    /** Reviews 상단 쇼릴 — 시안 black 15% */
    reviewsMediaOverlay: "rgba(0,0,0,0.15)",
    reviewsMediaBg: "#FFFFFF",
    /** Reviews 카드 — 시안 #3C3530 / #F5F3EF */
    reviewsDarkBg: "#3C3530",
    reviewsLightBg: "#F5F3EF",
    reviewsDarkText: "#F5F3EF",
    reviewsLightText: "#3C3530",
    reviewsService: "#6F6F6F",
    reviewsMeta: "#919191",
    reviewsMetaLight: "#919191",
    reviewsMetaDark: "#919191",
    /** Reservation — 시안 07 */
    reservationPanelBg: "#3C3530",
    reservationText: "#FFFFFF",
    reservationMuted: "rgba(255,255,255,0.42)",
    /** 스텝 비활성 / 02 */
    reservationStepMuted: "#7D7D7D",
    /** 필드 텍스트 흰색 Regular */
    reservationFieldText: "#FFFFFF",
    /** 캘린더 헤더 #3C3530 / 80% */
    reservationCalHeader: "rgba(60,53,48,0.8)",
    /** 캘린더 바디 #FFFFFF / 80% */
    reservationCalBody: "rgba(255,255,255,0.8)",
    reservationCalMuted: "#919191",
    reservationCalText: "#111111",
    reservationSelected: "#3C3530",
    reservationSun: "#8F0C0C",
    /** 시안 드롭다운 — BG #3C3530 · border #fff · 기본 #808080 · 활성 #D6D6D6 / #25201C */
    reservationDropdownHover: "#25201C",
    reservationDropdownMuted: "#808080",
    reservationDropdownActiveText: "#D6D6D6",
    reservationDropdownBorder: "#FFFFFF",
    reservationDropdownBg: "#3C3530",
    /** 필드 언더라인 흰색 1pt */
    reservationLine: "#FFFFFF",
    reservationSummaryHeader: "rgba(60,53,48,0.8)",
    reservationSummaryBody: "rgba(255,255,255,0.8)",
    reservationSummaryLabel: "#111111",
    reservationSummaryValue: "#111111",
    reservationSummaryNote: "#919191",
    reservationSummaryDivider: "rgba(17,17,17,0.15)",
    reservationCtaBg: "#111111",
    reservationCtaHoverBg: "#F5F3EF",
    reservationCtaHoverText: "#111111",
    reservationPlaceholder: "#919191",
    reservationCheckBg: "#FFFFFF",
    reservationCheckMark: "#111111",
    /** Footer — 시안 08 */
    footerBg: "#111111",
    footerText: "#FFFFFF",
    footerMuted: "#7D7D7D",
    footerDivider: "#FFFFFF",
    /** 모바일 Footer 구분선 — 시안 rgba(255,255,255,0.5) */
    footerDividerMobile: "rgba(255, 255, 255, 0.5)",
  },
  size: {
    announcementHeight: 45,
    headerHeight: 90,
    /** 시안: 헤더 바로 아래 Hero 시작 */
    headerToHeroGap: 0,
    pageSidePadding: 24,
    heroHeight: 700,
    /** 시안 주석에 radius 없음 → 직각 */
    heroRadius: 0,
    /** 시안: 로고 박스 109×23 */
    logoW: 109,
    logoH: 23,
    /** 시안: 실시간 예약하기 200×50 · radius 4 */
    ctaWidth: 200,
    ctaHeight: 50,
    ctaRadius: 4,
    /** 시안 실측: CTA 갈매기 ≈7×12 (문자 › 사용 금지) */
    /** CTA 갈매기 — 시안 대비 더 크고 굵게 */
    ctaChevronW: 10,
    ctaChevronH: 16,
    /** 시안: CTA 좌·우 패딩 ≈18 */
    ctaPadX: 18,
    /** GNB 링크 간격 46 */
    navGap: 46,
    /** Hero 텍스트 — 좌 24/24 · 우 24/40 · eyebrow→title 38 · title→body 20 */
    heroLeftPadX: 24,
    heroLeftPadBottom: 24,
    heroRightPadX: 24,
    heroRightPadBottom: 40,
    heroEyebrowToTitle: 38,
    heroRightTitleToBody: 20,
    heroTitleLineHeight: 75,
    heroRightBodyLineHeight: 25,
    /** Hero 하단 → About 상단 160 */
    heroToAboutGap: 160,
    // About — 시안 수정사항 (1440)
    aboutSidePadding: 120,
    /** Hero→About 간격은 heroToAboutGap(160) */
    aboutPadTop: 0,
    aboutPadBottom: 140,
    aboutEyebrowToTitle: 38,
    aboutTitleToSubtitle: 44,
    aboutStatsGapTop: 110,
    aboutStatsGapBottom: 110,
    /** 1→2열 27 · 이후 32 */
    aboutStatsGapFirst: 27,
    aboutStatsColGap: 32,
    aboutStatNumberToLine: 32,
    aboutStatLineToLabel: 32,
    aboutStatLabelToDesc: 20,
    aboutTextCol: 247,
    aboutTextMediaGap: 61,
    aboutInteriorW: 584,
    aboutInteriorH: 740,
    aboutPortraitW: 276,
    aboutPortraitH: 370,
    aboutMediaGap: 32,
    aboutImageRadius: 10,
    aboutParagraphGap: 61,
    aboutTitleLineHeight: 75,
    aboutStatDescLineHeight: 25,
    aboutBodyLineHeight: 27,
    // Brand ticker — 시안 H 150 · 로고 gap 148 · 상하 섹션간격 140(About padBottom / Team padTop)
    brandTickerHeight: 150,
    /** 시안 광학 기준 높이 — 브랜드별 scale과 곱해 실제 표시 */
    brandLogoHeight: 28,
    brandLogoGap: 148,
    // Team — 시안 04 실측 (1440 ← 1024 mock × 1.406)
    teamSidePadding: 24,
    teamPadTop: 140,
    teamPadBottom: 140,
    teamTitleGap: 50,
    teamCollageH: 520,
    teamFeaturedW: 580,
    teamStripW: 190,
    teamGap: 13,
    teamRadius: 10,
    /** 시안 04 오버레이 좌·하 48 */
    teamOverlayPadX: 48,
    teamOverlayPadY: 48,
    teamRoleToName: 15,
    teamInstagramSize: 20,
    // Services — 시안 수정사항 (1440)
    servicesSidePadding: 120,
    servicesPadTop: 100,
    servicesPadBottom: 100,
    /** 1200 content = text 469 + gap 245 + image 486 */
    servicesTextW: 469,
    servicesImageW: 486,
    servicesImageH: 548,
    servicesImageRadius: 10,
    servicesGap: 245,
    servicesCtaW: 315,
    servicesCtaH: 66,
    servicesCtaRadius: 4,
    servicesCtaPadX: 24,
    servicesNavH: 23,
    /** 시안: 화살표 간격 27 */
    servicesNavGap: 27,
    /** 시안: 화살표 → 이미지 32 */
    servicesNavToImage: 32,
    /** 시안 실측: 갈매기 ≈13×23 · 꼭지각≈85° · 스트로크≈2.5 */
    servicesChevronW: 13,
    servicesChevronH: 23,
    servicesEyebrowToTitle: 38,
    servicesTitleToSubtitle: 38,
    servicesSubtitleToBody: 16,
    servicesBodyToList: 85,
    servicesBodyLineHeight: 35,
    /** 시안: 항목 LH=1 · rowGap으로 피치 ≈34 (가격 18 기준 gap 16) */
    servicesListLineHeight: 1,
    servicesListItemGap: 16,
    /** 시안: 리스트 ↔ ※문구 32 */
    servicesListToNote: 32,
    servicesNoteToCta: 40,
    servicesListW: 469,
    servicesPriceColW: 90,
    // Reviews — 비디오 크림 스트립 + 카드 그리드 (1440)
    reviewsImageSidePadding: 24,
    reviewsSidePadding: 120,
    reviewsMediaPadY: 140,
    reviewsImageH: 600,
    reviewsImageRadius: 10,
    reviewsPadBottom: 140,
    reviewsTitleToGrid: 50,
    reviewsGridGap: 30,
    reviewsCardSize: 380,
    reviewsCardRadius: 10,
    reviewsCardPad: 30,
    reviewsQuoteLineHeight: 30,
    reviewsSubLineHeight: 27,
    // Reservation — 시안 07 (1440 · H 798 · 50:50)
    reservationH: 798,
    reservationPanelW: 720,
    reservationSidePad: 100,
    reservationTitleTop: 80,
    reservationTitleToBody: 38,
    reservationBodyToFields: 85,
    reservationBodyLineHeight: 30,
    reservationFieldGap: 90,
    reservationFieldH: 48,
    reservationPadBottom: 80,
    /** 캘린더 430×408 · 헤더 83 */
    reservationCalW: 430,
    reservationCalH: 408,
    reservationCalRadius: 10,
    reservationCalHeaderH: 83,
    reservationCalPadX: 28,
    reservationCalPadTop: 22,
    reservationCalPadBottom: 28,
    reservationCalDaySize: 36,
    reservationCalDowToDates: 20,
    /** 화살표 클릭 영역 고정 50 · 월명(SEPTEMBER) 고정폭 */
    reservationCalArrowW: 50,
    reservationCalMonthW: 140,
    reservationCalBlur: 8,
    /** 요약 카드 = 캘린더와 동일 430×408 · 헤더 83 */
    reservationSummaryW: 430,
    reservationSummaryH: 408,
    reservationSummaryHeaderH: 83,
    reservationSummaryRadius: 10,
    reservationSummaryPadX: 36,
    reservationSummaryPadY: 28,
    reservationSummaryRowGap: 23,
    reservationSummaryRowLh: 30,
    reservationCtaW: 247,
    reservationCtaH: 65,
    reservationCtaRadius: 4,
    reservationCtaPadX: 24,
    /** step02 필드 간격 */
    reservationStep2FieldGap: 45,
    reservationStep2BlockGap: 60,
    reservationFieldChevron: 14,
    /** 스텝 갈매기 높이 — 시안 90° 라인 아이콘 */
    reservationStepChevron: 22,
    reservationDropdownItemH: 35,
    reservationDropdownPadX: 20,
    reservationDropdownLineHeight: 35,
    // Footer — 시안 08 (1440×480)
    footerSidePadding: 120,
    footerPadTop: 80,
    footerPadBottom: 80,
    footerH: 480,
    footerLogoW: 175,
    footerLogoH: 37,
    /** 로고 → Opening Hours */
    footerLogoToHours: 277,
    /** 컬럼 간격 (Hours↔Contact↔Social) */
    footerColGap: 130,
    footerMainToDivider: 40,
    footerDividerToBottom: 36,
    footerHoursTitleGap: 18,
    footerHoursDayToTime: 18,
    footerHoursBlockGap: 28,
    footerContactTitleGap: 18,
    footerContactBlockGap: 36,
    footerContactLastGap: 40,
    footerSocialTitleGap: 18,
    footerSocialItemGap: 24,
  },
  /** 시안 실측 광학 비율 — Kérastase(+PARIS) ≈ 1.7× */
  /**
   * Brand ticker 광학 스케일 (동일 박스 높이 ≠ 동일 가시 크기)
   * Kérastase(+PARIS) SVG는 여백이 커서 ~1.9× 필요
   */
  brandLogoScale: {
    aveda: 1,
    kerastase: 1.9,
    shiseido: 1.05,
    olaplex: 1,
    moroccanoil: 0.95,
  },
  /**
   * Team collage 크롭 — object-position만 사용 (scale 금지 → 레터박스)
   * 1·3번은 세로 원본(team/*.jpg) 기준. Y↑ = 위로 잘림
   */
  teamImageCrop: {
    featured: { position: "50% 12%" },
    1: { position: "50% 12%" },
    2: { position: "50% 8%" },
    3: { position: "50% 8%" },
    4: { position: "50% 8%" },
    5: { position: "50% 8%" },
  },
  /** @deprecated teamImageCrop 사용 */
  teamObjectPosition: {
    featured: "50% 12%",
    1: "50% 12%",
    2: "50% 8%",
    3: "50% 8%",
    4: "50% 8%",
    5: "50% 8%",
  },
  /**
   * 1·3번: v10 스퀘어 크롭은 화각이 너무 좁음 → 세로 원본 사용
   * (2·4·5는 v10 유지)
   */
  teamImagePathOverride: {
    1: "team/jay.jpg",
    3: "team/minji.jpg",
  } as Record<number, string>,
  font: {
    announcement: 13,
    /** 시안 로고 박스 높이 23 */
    logo: 22,
    /** GNB Poppins Regular 15 */
    nav: 15,
    /** CTA Noto Regular 15 */
    cta: 15,
    /** Hero: Poppins Light 16 / Regular 60 · 우측 Noto Medium 18 / Regular 15 */
    heroEyebrow: 16,
    heroTitle: 60,
    heroRightHeadline: 18,
    heroRightBody: 15,
    aboutEyebrow: 16,
    aboutTitle: 60,
    aboutSubtitle: 20,
    aboutStatValue: 48,
    aboutStatSuffix: 34,
    aboutStatLabel: 20,
    aboutStatDesc: 16,
    aboutBody: 15,
    teamTitle: 60,
    teamRole: 13,
    teamName: 24,
    servicesEyebrow: 16,
    servicesTitle: 60,
    servicesSubtitle: 20,
    servicesBody: 16,
    servicesItem: 16,
    servicesPrice: 18,
    servicesNote: 16,
    servicesCta: 16,
    reviewsTitle: 60,
    reviewsQuote: 18,
    reviewsArtist: 15,
    reviewsService: 15,
    reviewsMeta: 15,
    reservationTitle: 60,
    reservationStep: 12,
    reservationBody: 16,
    reservationField: 16,
    reservationDropdown: 16,
    reservationCalYear: 16,
    reservationCalMonth: 20,
    reservationCalDow: 14,
    reservationCalDay: 16,
    reservationSummaryTitle: 20,
    reservationSummaryLabel: 16,
    reservationSummaryValue: 16,
    reservationSummaryNote: 14,
    reservationCta: 16,
    footerBrand: 28,
    footerHeading: 20,
    footerBodyEn: 16,
    footerBodyKo: 15,
    footerLegal: 12,
  },
  tracking: {
    /** 시안 로고: 살짝만 벌림 (0.12는 찐빵처럼 납작해 보임) */
    logo: "0.04em",
    teamRole: "0.08em",
    teamTitle: "-0.015em",
    /** Reviews 자간 5 / 75 (1/1000 em) */
    reviewsQuote: "0.005em",
    reviewsArtist: "0.075em",
    /** Footer legal 자간 50 / 25 */
    footerLegalKo: "0.05em",
    footerLegalEn: "0.025em",
    /** Reservation 캘린더 자간 10 */
    reservationCal: "0.01em",
  },
  weight: {
    logo: 500,
    /** Hero: Light / Regular / Medium / Regular */
    heroEyebrow: 300,
    heroTitle: 400,
    heroRightHeadline: 500,
    heroRightBody: 400,
    aboutEyebrow: 300,
    /** Regular */
    aboutTitle: 400,
    aboutSubtitle: 700,
    aboutStatValue: 400,
    aboutStatSuffix: 300,
    aboutStatLabel: 400,
    aboutStatDesc: 400,
    aboutBody: 400,
    /** Regular — Medium(500)보다 부드럽게 */
    teamTitle: 400,
    teamRole: 400,
    /** 영문 Medium 혼합 — 500 */
    teamName: 500,
    /** Light / Regular / Medium */
    servicesEyebrow: 300,
    servicesTitle: 400,
    servicesSubtitle: 500,
    servicesBody: 400,
    servicesItem: 400,
    servicesPrice: 400,
    servicesCta: 500,
    reviewsTitle: 400,
    reviewsQuote: 500,
    reviewsArtist: 500,
    reviewsService: 400,
    /** Demilight */
    reviewsMeta: 300,
    /** Regular */
    reservationTitle: 400,
    reservationStep: 400,
    reservationStepMuted: 400,
    reservationBody: 400,
    reservationField: 400,
    reservationDropdown: 400,
    reservationDropdownActive: 400,
    /** Light / Regular */
    reservationCalYear: 300,
    reservationCalMonth: 400,
    reservationSummaryTitle: 400,
    reservationSummaryLabel: 400,
    reservationSummaryValue: 500,
    reservationSummaryValueBold: 700,
    reservationCta: 400,
    footerBrand: 500,
    footerHeading: 500,
    footerBody: 400,
    /** Light */
    footerLegal: 300,
    footerLegalEn: 400,
  },
  /**
   * 모바일 HUM 시안 — 아트보드 375
   * 01 MENU OPEN 실측 (2026-07-28)
   * 06 FOOTER 실측 — export 355→375 스케일 (2026-07-28)
   */
  mobile: {
    canvas: 375,
    maxWidthPx: 767,
    /** 시안 .Rectangle — H38 · Noto 12 · LH 2.33 · #3C3530 */
    announcementHeight: 38,
    announcementFont: 12,
    announcementLineHeight: 2.33,
    headerHeight: 60,
    sidePadding: 16,
    /** 시안 .hair_up_logo — 114×24 */
    logoW: 114,
    logoH: 24,
    /** 시안 .HAMBURGER — 26×19 · border 2px #111 */
    hamburgerW: 26,
    hamburgerH: 19,
    hamburgerStroke: 2,
    /** 시안 .CLOSE — 24×24 · border 1.5px #111 */
    closeIcon: 24,
    closeStroke: 1.5,
    /** 시안 .MENU — Poppins 36 · LH 1.81 · gap 40 · padTop 60 */
    navFont: 36,
    navLineHeight: 1.81,
    navGap: 40,
    navPadTop: 60,
    /** REVIEW 하단 → CTA */
    navToCta: 60,
    /** 시안 .RECTANGLE_7 — 343×56 · r6 · padX 24 */
    ctaWidth: 343,
    ctaHeight: 56,
    ctaRadius: 6,
    ctaFont: 15,
    ctaPadX: 24,
    /** 시안 .옆_화살표 — 5×9 · border 2px #F4EEEE */
    ctaChevronW: 5,
    ctaChevronH: 9,
    ctaChevronStroke: 2,
    ctaChevronColor: "#F4EEEE",
    // —— Hero (시안 04·05 실측) ——
    heroSidePadding: 16,
    heroGapTop: 0,
    /** .Rectangle_TOP / .Rectangle_BOTTOM — 344×401 */
    heroCardW: 344,
    heroCardH: 401,
    heroCardRadius: 10,
    heroCardGap: 0,
    heroPadX: 20,
    heroPadBottom: 24,
    /** .WELCOME_TO_HAIR_UP — Poppins 14 / LH 1.2 · gap 24 */
    heroEyebrow: 14,
    heroEyebrowLineHeight: 1.2,
    heroEyebrowToTitle: 24,
    /** .Elevate… — Poppins 33 / LH 1.3 */
    heroTitle: 33,
    heroTitleLineHeight: 1.3,
    /** .BOTTOM_TITLE — Noto 18 · gap 16 */
    heroRightHeadline: 18,
    heroRightTitleToBody: 16,
    /** .BOTTOM_TEXT — Noto 15 / LH 2.07 */
    heroRightBody: 15,
    heroRightBodyLineHeight: 2.07,
    /** 하단 카드 → ABOUT 텍스트 */
    heroToAboutGap: 100,
    // —— About (시안 06 실측) ——
    aboutSidePadding: 16,
    aboutPadTop: 100,
    aboutPadBottom: 40,
    /** .ABOUT_HAIR_UP — Poppins 14 / LH 1.2 · #111 · gap 24 */
    aboutEyebrow: 14,
    aboutEyebrowLineHeight: 1.2,
    aboutEyebrowToTitle: 24,
    /** Where Your… — Poppins 33 / LH 1.4 · gap 20 */
    aboutTitle: 33,
    aboutTitleLineHeight: 1.4,
    aboutTitleToSubtitle: 20,
    /** 감각적인… — Noto 16 / LH 0.83 · #444 */
    aboutSubtitle: 16,
    aboutSubtitleLineHeight: 0.83,
    aboutSubtitleColor: "#444444",
    aboutStatsGapTop: 80,
    /** .stat_number — Poppins 42 / LH 1.79 · #111 */
    aboutStatValue: 42,
    aboutStatSuffix: 42,
    aboutStatValueLineHeight: 1.79,
    /** number→line 24 · line→title 24 · title→desc 20 · block 60 */
    aboutStatNumberToLine: 24,
    aboutStatLineToLabel: 24,
    aboutStatLineW: 341,
    aboutStatLabel: 18,
    aboutStatLabelLineHeight: 1.3,
    aboutStatLabelToDesc: 20,
    aboutStatDesc: 15,
    aboutStatDescLineHeight: 1.67,
    aboutStatDescColor: "#444444",
    aboutStatBlockGap: 60,
    aboutMuted: "#444444",
    // —— About body (시안 08·09) ——
    /** .About_Rectangle — 344×401 · r10 · #000 */
    aboutInteriorH: 401,
    aboutInteriorRadius: 10,
    aboutStatsToMedia: 80,
    aboutMediaToBody: 30,
    /** .About_text — Noto 15 / LH 1.67 · #111 · 문단 gap 25 */
    aboutBody: 15,
    aboutBodyLineHeight: 1.67,
    aboutParagraphGap: 25,
    aboutBodyColor: "#111111",
    /** 본문 → brand ticker */
    aboutPadBottomAfterBody: 80,
    // —— Brand ticker (시안 09) — H80 · #F7F4EF ——
    brandTickerHeight: 80,
    brandTickerBg: "#F7F4EF",
    /** 광학 스케일 적용 전 베이스 (Kérastase 1.9× ≈ 23) */
    brandLogoHeight: 12,
    brandLogoGap: 50,
    // —— Team (시안 10) ——
    teamSidePadding: 16,
    teamPadTop: 80,
    teamPadBottom: 80,
    teamTitleGap: 40,
    /** .Professional_Team — Poppins 33 · #111 */
    teamTitle: 33,
    /** .Rectangle — 310×400 · r10 */
    teamCardW: 310,
    teamCardH: 400,
    teamCardGap: 16,
    teamRadius: 10,
    teamOverlayPadX: 20,
    teamOverlayPadY: 20,
    teamRoleToName: 10,
    /** .직책 — Poppins 11 · #F7F4EF */
    teamRole: 11,
    teamRoleColor: "#F7F4EF",
    /** .Name — Noto/Poppins 20 · IG 24 · gap 10 */
    teamName: 20,
    teamInstagramSize: 24,
    teamNameToIg: 10,
    // —— Services (시안 11·12·13) ——
    servicesSidePadding: 16,
    servicesPadTop: 80,
    servicesPadBottom: 80,
    /** .service_category — Poppins Light 14 · gap 25 */
    servicesEyebrow: 14,
    servicesEyebrowToTitle: 25,
    /** .service_title — Poppins 33 · gap 25 */
    servicesTitle: 33,
    servicesTitleToSubtitle: 25,
    /** .service_desc — Noto 15 / LH 1.67 · medium+regular */
    servicesSubtitle: 15,
    servicesSubtitleToBody: 0,
    servicesBody: 15,
    servicesBodyLineHeight: 1.67,
    servicesBodyToImage: 40,
    /** .service_imgbox — 343×400 · r10 */
    servicesImageW: 343,
    servicesImageH: 400,
    servicesImageRadius: 10,
    servicesImageToList: 40,
    /** .service_name / .service_price — 15 / LH 1.5 */
    servicesItem: 15,
    servicesPrice: 15,
    servicesItemLineHeight: 1.5,
    servicesListItemGap: 20,
    /** .service_notice — 15 · #919191 · gap 25 · note→CTA 40 */
    servicesListToNote: 25,
    servicesNote: 15,
    servicesNoteToCta: 40,
    /** .btn_booking — 343×72 · r6 · padX 24 · text 15/500 · arrow 6×10 */
    servicesCtaH: 72,
    servicesCtaRadius: 6,
    servicesCtaPadX: 24,
    servicesCtaFont: 15,
    servicesCtaChevronW: 6,
    servicesCtaChevronH: 10,
    servicesCtaChevronStroke: 2,
    /** .page_num — 57×24 · r12 · right/bottom 16 · rgba(17,17,17,0.3) · 12 */
    servicesBadgeW: 57,
    servicesBadgeH: 24,
    servicesBadgePadR: 16,
    servicesBadgePadB: 16,
    servicesBadgeRadius: 12,
    servicesBadgeFont: 12,
    servicesBadgeBg: "rgba(17, 17, 17, 0.3)",
    // —— Reviews (시안 16·17) ——
    reviewsSidePadding: 16,
    reviewsMediaPadTop: 80,
    reviewsMediaPadBottom: 80,
    /** .video_container — 343×429 · r10 · overlay 15% */
    reviewsImageH: 429,
    reviewsImageRadius: 10,
    reviewsMediaOverlay: "rgba(0, 0, 0, 0.15)",
    /** Reviews From Customers — Poppins 33 · gap 40 */
    reviewsTitle: 33,
    reviewsTitleLineHeight: 1.2,
    reviewsTitleToGrid: 40,
    reviewsPadBottom: 80,
    /** cards 310² · r10 · pad 30/20 · gap 16 */
    reviewsCardSize: 310,
    reviewsCardRadius: 10,
    reviewsCardPadY: 30,
    reviewsCardPadX: 20,
    reviewsCardGap: 16,
    reviewsQuoteToMeta: 20,
    /** quote 16/500/LH1.75 · artist 12/500 · service 11/400 · meta 11/300 */
    reviewsQuote: 16,
    reviewsQuoteLineHeight: 1.75,
    reviewsArtist: 12,
    reviewsService: 11,
    reviewsMeta: 11,
    reviewsSubLineHeight: 1.4,
    // —— Reservation / Booking (HUM 07) ——
    /** 비주얼(캘린더) 영역 높이 — 시안 크롭 422 */
    reservationVisualH: 422,
    reservationCalW: 343,
    reservationCalH: 360,
    reservationCalHeaderH: 80,
    reservationCalRadius: 16,
    reservationCalPadX: 20,
    reservationCalPadTop: 18,
    reservationCalPadBottom: 22,
    reservationCalDaySize: 32,
    reservationCalDowToDates: 16,
    reservationCalArrowW: 44,
    reservationCalMonthW: 120,
    reservationCalYear: 14,
    reservationCalMonth: 18,
    reservationCalDow: 12,
    reservationCalDay: 14,
    reservationSummaryW: 343,
    reservationSummaryH: 360,
    reservationSummaryHeaderH: 80,
    reservationSummaryRadius: 16,
    reservationSummaryPadX: 24,
    reservationSummaryPadY: 22,
    reservationSummaryRowGap: 18,
    reservationSummaryRowLh: 24,
    reservationSummaryTitle: 16,
    reservationSummaryLabel: 14,
    reservationSummaryValue: 14,
    reservationSummaryNote: 12,
    reservationSidePad: 16,
    reservationPadTop: 80,
    reservationPadBottom: 80,
    reservationTitle: 32,
    reservationTitleToBody: 32,
    reservationBody: 14,
    reservationBodyLineHeight: 24,
    reservationBodyToFields: 48,
    reservationFieldGap: 48,
    reservationFieldH: 44,
    reservationField: 15,
    reservationStep: 12,
    reservationStep2FieldGap: 48,
    reservationStep2BlockGap: 20,
    reservationFieldChevron: 12,
    reservationStepChevron: 18,
    reservationDropdownItemH: 40,
    reservationDropdownPadX: 16,
    reservationCtaH: 56,
    reservationCtaRadius: 4,
    reservationCtaPadX: 18,
    reservationCtaFont: 15,
    // —— Footer (시안 18·19) ——
    footerSidePad: 16,
    footerPadTop: 60,
    footerPadBottom: 60,
    /** .footer_logo — 144×30 · → Opening Hours 60 */
    footerLogoW: 144,
    footerLogoH: 30,
    footerLogoToHours: 60,
    /** 섹션 간 (hours/address/phone/email) 40 */
    footerSectionGap: 40,
    /** .footer_info_title → body 20 */
    footerHeadingToBody: 20,
    footerHoursDayToTime: 20,
    /** time → 다음 day 30 */
    footerHoursBlockGap: 30,
    footerFollowToSocial: 20,
    footerSocialItemGap: 25,
    /** YOUTUBE → divider 60 */
    footerSocialToDivider: 60,
    /** divider → company 40 */
    footerDividerToLegal: 40,
    /** company 내부 줄간격은 LH 1.6 */
    footerLegalBizGap: 0,
    /** company → copyright 25 */
    footerLegalToCredit: 25,
    /** copyright 블록 줄간격 LH 1.6 */
    footerCreditGap: 0,
    footerDesignedToAdmin: 0,
    footerLegalLineHeight: 1.6,
    /** .footer_info_title — Poppins 18/500 */
    footerHeading: 18,
    footerHeadingWeight: 500,
    /** .footer_info_text — 15 */
    footerBodyEn: 15,
    footerBodyKo: 15,
    footerBodyWeight: 400,
    footerDayWeight: 400,
    footerSocialWeight: 400,
    /** .footer_company_info / copyright — 12 · #7D7D7D · LH 1.6 */
    footerLegal: 12,
    footerLegalWeight: 300,
    footerLegalEnWeight: 400,
  },
} as const;

export type DesignTokens = typeof designTokens;
