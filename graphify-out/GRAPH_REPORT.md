# Graph Report - ban-toan-app  (2026-11-13)

## Corpus Check
- 393 files · ~389,967 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 12 file(s) not represented in the graph (top: .woff2 4, (none) 3, .ttf 3)

## Summary
- 3115 nodes · 9764 edges · 128 communities (121 shown, 7 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 100 edges (avg confidence: 0.84)
- Token cost: 307,006 input · 0 output

## Community Hubs (Navigation)
- Motion clips & chat facts
- Lab summaries & math helpers
- Exam review & mock exam
- Concept pool tests
- Solids & plane workshop
- Home desk & topic catalog
- Lesson-type (dạng) tests
- Question banks & lessons
- Canvas drawing helpers
- App shell & routes
- Math oracles & summaries
- Math check script
- Study music player logic
- Practice generator
- SQLite DB & schema
- Pay handlers & affiliate
- Crypto pay tests
- API route shims
- CI workflow
- Free LLM model routing
- Golden math tests
- Crypto chain verification
- MoMo & pay tests
- THPT practice store
- Upgrade & license UI
- Pay store (SQLite/PG)
- Tutor format & policy
- Theme & route context
- Grade book index
- Chat panel UI
- Grade practice store
- THPT question checks
- Integral & probability variants
- Miss book & gap drills
- Lab parameter ranges
- Progress store core
- Topic desk & captions
- Research & docs tests
- Study room scenes
- Sympy oracle scripts
- Dev dependencies
- DSS variant banks
- Trig & survey variants
- Chat tests & lectures
- Assessment & formula book
- Variant tests
- Quadratic variants
- Research study log
- App TS config
- Grade content tests
- Test DB & affiliate tests
- Doc export tests
- Chat equation facts
- Inequality & combo variants
- Trig lab
- Study pack model
- Scripts TS config
- Grade desk UI
- Sequence & limit variants
- Doc page & downloads
- DSS expression helpers
- Store unit tests
- HTTP bridge tests
- Derivative & integral DSS
- Survey & sequence DSS
- Exponential variants
- Chat env & handler
- Runtime dependencies
- Analytic geometry variants
- Research studies catalog
- THPT 2025 exam format
- Node TS config
- Study media generator
- Answer recording
- DSS item claims
- npm scripts
- Exponential lab
- Vector variants
- DOCX & ZIP export
- PDF export
- Methods catalog
- Topic cards & streams
- Premium routes & admin (docs)
- Triangle variants
- Cross-tab store sync
- Bank & MoMo flow (docs)
- README overview
- HTTP bridge
- Diagram SVG sanitizer
- Derivative variants
- Shuffle & notes
- AI gateway & free LLMs (docs)
- Grade depth asks
- Grade figures
- Study pack builder
- Quadratic DSS
- Fraction math helpers
- Attempt slots & saving
- Vite & PWA build
- VietQR codec
- Exponential DSS
- Vector DSS
- Inequality DSS
- Trig DSS
- Learner text scanner
- Grade widgets
- THPT bag store
- PayStore backends (docs)
- Premium features (docs)
- Grade types
- Probability DSS
- Policy & refund terms
- License & tutor limits (docs)
- Storage & startup (docs)
- Lint config
- Supabase mirror
- Favicon design
- Root TS config
- Icon 192 design
- Icon 512 design
- Vercel config
- Crypto payment (docs)
- Fontkit types
- Vite env types
- Root mount
- robots.txt

## God Nodes (most connected - your core abstractions)
1. `t()` - 175 edges
2. `useLang()` - 162 edges
3. `made()` - 94 edges
4. `read()` - 90 edges
5. `MathText()` - 82 edges
6. `fmt()` - 79 edges
7. `react` - 76 edges
8. `A()` - 66 edges
9. `paintBase()` - 56 edges
10. `halo()` - 56 edges

## Surprising Connections (you probably didn't know these)
- `Server-computed equation facts (Δ, Vi-ét; facts.ts)` --semantically_similar_to--> `npm run test:content (sympy check)`  [INFERRED] [semantically similar]
  docs/TRO-LY.md → README.md
- `post()` --calls--> `handlePremium()`  [EXTRACTED]
  scripts/affiliate.test.ts → server/pay/handlers.ts
- `post()` --calls--> `handleChat()`  [EXTRACTED]
  scripts/chat.test.ts → server/chat/handlers.ts
- `post()` --calls--> `handlePremium()`  [EXTRACTED]
  scripts/crypto.test.ts → server/pay/handlers.ts
- `get()` --calls--> `handlePremium()`  [EXTRACTED]
  scripts/crypto.test.ts → server/pay/handlers.ts

## Import Cycles
- 2-file cycle: `server/pay/pgStore.ts -> server/pay/store.ts -> server/pay/pgStore.ts`

## Hyperedges (group relationships)
- **Four Premium payment methods converging on markPaid** — docs_thanh_toan_momo_wallet, docs_thanh_toan_qr_payment, docs_thanh_toan_bank_transfer, docs_thanh_toan_crypto_payment, docs_thanh_toan_markpaid [INFERRED 0.85]
- **Premium license gating across features** — docs_thanh_toan_license_code, docs_thanh_toan_ban_toan_license, docs_tro_ly_premium_modes, docs_tro_ly_rate_limits, docs_thanh_toan_study_pack, docs_tro_ly_lecture_videos [EXTRACTED 1.00]
- **Free LLM catalog vendoring pipeline** — vendor_awesome_free_llm_apis_source_upstream, docs_tro_ly_free_llm_sync, docs_tro_ly_free_providers, docs_tro_ly_provider_fallback_chain [EXTRACTED 1.00]

## Communities (128 total, 7 thin omitted)

### Community 0 - "Motion clips & chat facts"
Cohesion: 0.06
Nodes (93): Spark(), draw(), still, draw(), LETTERS, still, draw(), still (+85 more)

### Community 1 - "Lab summaries & math helpers"
Cohesion: 0.08
Nodes (79): chanceSummary(), ineqSummary(), integralSummary(), quadraticSummary(), AnalyticLab(), Hit, rightAngle(), unit() (+71 more)

### Community 2 - "Exam review & mock exam"
Cohesion: 0.06
Nodes (70): name(), answers, clean, dirty, memory, missed, NOON, paper (+62 more)

### Community 3 - "Concept pool tests"
Cohesion: 0.07
Nodes (54): assert(), checkTex(), claimIds, fails, pools, proved, texOf(), analyticConceptQuestions (+46 more)

### Community 4 - "Solids & plane workshop"
Cohesion: 0.06
Nodes (55): chop, cone, cylinderShort, cylinderTall, edges, prism, segs, sphere (+47 more)

### Community 5 - "Home desk & topic catalog"
Cohesion: 0.13
Nodes (51): streamName(), topicById(), loadTopic(), Continue(), DeskCorner(), HomeDesk(), ProgressLine(), TopicRow() (+43 more)

### Community 6 - "Lesson-type (dạng) tests"
Cohesion: 0.07
Nodes (46): topic(), assert(), auditRich(), checkProse(), checks, contentFiles, controlChars(), fails (+38 more)

### Community 7 - "Question banks & lessons"
Cohesion: 0.07
Nodes (47): banks, isSheet(), lessonFor(), questionsFor(), analyticLesson, analyticQuestions, comboLesson, comboQuestions (+39 more)

### Community 8 - "Canvas drawing helpers"
Cohesion: 0.18
Nodes (56): drawCircle(), drawLine(), drawPlane(), drawScores(), drawSeats(), drawWays(), drawSecant(), drawThrow() (+48 more)

### Community 9 - "App shell & routes"
Cohesion: 0.07
Nodes (46): App(), AssessPage, Boundary, Broken(), chunkFailed(), DocPage, DrillPage, ExamPage (+38 more)

### Community 10 - "Math oracles & summaries"
Cohesion: 0.09
Nodes (54): both(), Choice, CIRCLE_EN, CIRCLE_VI, Exact, EXACT, expectCorrect(), FIXED (+46 more)

### Community 11 - "Math check script"
Cohesion: 0.04
Nodes (53): aHi, aLo, assert(), atOne, banks, basis, bayesQ, boyCases (+45 more)

### Community 12 - "Study music player logic"
Cohesion: 0.09
Nodes (47): active, back, four, hidden, last, mem, nen, one (+39 more)

### Community 13 - "Practice generator"
Cohesion: 0.04
Nodes (36): build(), choose(), coprime(), cos60, dec(), decs(), factorial(), gcd() (+28 more)

### Community 14 - "SQLite DB & schema"
Cohesion: 0.06
Nodes (36): client, [command, arg], client, crypto, dir, moved, old, otherInstance (+28 more)

### Community 15 - "Pay handlers & affiliate"
Cohesion: 0.11
Nodes (47): commissionOf(), normalizeCode(), sameReferrer(), secretHash(), chainSample(), isCryptoChain(), normalizeTx(), priceOf() (+39 more)

### Community 16 - "Crypto pay tests"
Cohesion: 0.05
Nodes (42): bsc, bscSmallest, chainIds, CryptoJson, dir, env, envFor(), fails (+34 more)

### Community 17 - "API route shims"
Cohesion: 0.06
Nodes (34): handler(), Req, Res, handler(), Req, Res, handler(), Req (+26 more)

### Community 18 - "CI workflow"
Cohesion: 0.05
Nodes (45): concurrency, cancel-in-progress, group, DATABASE_URL, PAY_TEST_STORE, POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER (+37 more)

### Community 19 - "Free LLM model routing"
Cohesion: 0.08
Nodes (39): data, keys, tried, RawData, RawModel, RawProvider, renderCatalog(), root (+31 more)

### Community 20 - "Golden math tests"
Cohesion: 0.10
Nodes (39): cauchy, cross, dice, fails, foot, means, solved, town (+31 more)

### Community 21 - "Crypto chain verification"
Cohesion: 0.10
Nodes (40): addressOk(), asRecord(), base58Decode(), base58Encode(), CHAINS, ChainSpec, chainSpec(), CRYPTO_CHAIN_IDS (+32 more)

### Community 22 - "MoMo & pay tests"
Cohesion: 0.08
Nodes (36): badSign, bankQr, code, createValues, decoded, dev, dir, documentedCreate (+28 more)

### Community 23 - "THPT practice store"
Cohesion: 0.12
Nodes (39): freshSeed(), clock(), ExamResult(), ExamRun(), Home(), loadBag(), percent(), PracticeRun() (+31 more)

### Community 24 - "Upgrade & license UI"
Cohesion: 0.10
Nodes (34): chainChoices(), CRYPTO_CHOICES, CryptoChainId, ChainPicker(), checkText(), CryptoCheck, CryptoPay(), CryptoView (+26 more)

### Community 25 - "Pay store (SQLite/PG)"
Cohesion: 0.10
Nodes (31): isUniqueViolation(), num(), numOrNull(), newAffiliateCode(), PayMethod, PlanId, pgStore(), count() (+23 more)

### Community 26 - "Tutor format & policy"
Cohesion: 0.11
Nodes (30): keys, inline(), normalizeMath(), ChatJson, clientIp(), handleChat(), json(), MODES (+22 more)

### Community 27 - "Theme & route context"
Cohesion: 0.13
Nodes (24): react, ThemeBridge(), RouteContext, RouteValue, setLang(), setTheme(), useRoute(), AreaNav() (+16 more)

### Community 28 - "Grade book index"
Cohesion: 0.20
Nodes (21): bookByGrade(), lessonAt(), lop01, lop02, lop03, lop04, lop05, lop06 (+13 more)

### Community 29 - "Chat panel UI"
Cohesion: 0.11
Nodes (28): Bubble(), bumpToday(), ChatPanel(), choosePhoto(), pickMode(), premiumOnly(), send(), ChatState (+20 more)

### Community 30 - "Grade practice store"
Cohesion: 0.12
Nodes (29): ADDED, bag, HAND, ids, OLD, restored, rows, thpt (+21 more)

### Community 31 - "THPT question checks"
Cohesion: 0.09
Nodes (28): checkMarked(), checkShape(), SympyRow, sympyRows(), valueOfSym(), valueOfTex(), bag, byTopic (+20 more)

### Community 32 - "Integral & probability variants"
Cohesion: 0.12
Nodes (31): ARCH, archTerm(), areaStem(), CONES, coneStem(), GAPS, gapStem(), integralVary() (+23 more)

### Community 33 - "Miss book & gap drills"
Cohesion: 0.14
Nodes (24): hit, mid, wrong, isSharedCorrect(), sharedDrill, SharedQuestion, loadMisses(), loadPicks() (+16 more)

### Community 34 - "Lab parameter ranges"
Cohesion: 0.13
Nodes (29): analyticInit, analyticRange, chanceInit, chanceRange, comboInit, comboRange, derivInit, derivRange (+21 more)

### Community 35 - "Progress store core"
Cohesion: 0.12
Nodes (30): Attempt, attemptMap(), baseData, baseline, blank(), clipText(), Data, data (+22 more)

### Community 36 - "Topic desk & captions"
Cohesion: 0.08
Nodes (27): EMPTY_THINK, captionFor(), captions, advanced, SangTao(), AnalyticLab, BIT_LABEL, ComboLab (+19 more)

### Community 37 - "Research & docs tests"
Cohesion: 0.08
Nodes (22): katex, html, quad, ROUTES, STUDY_IDS, bayes, cone, cubic (+14 more)

### Community 38 - "Study room scenes"
Cohesion: 0.11
Nodes (17): isSceneMode(), sceneFromHour(), SceneId, SceneMode, SCENES, ZONES, art, ArtBoundary (+9 more)

### Community 39 - "Sympy oracle scripts"
Cohesion: 0.12
Nodes (10): A(), atleast(), breaks(), C(), denom(), put(), sc(), as_solution_set() (+2 more)

### Community 40 - "Dev dependencies"
Cohesion: 0.10
Nodes (27): devDependencies, @electric-sql/pglite@^0.5.15, oxlint@^1.81.0, pdfjs-dist@^6.5.438, tsx@^4.23.15, @types/node@^24.13.3, @types/pg@^8.23.1, @types/qrcode@^1.5.6 (+19 more)

### Community 41 - "DSS variant banks"
Cohesion: 0.10
Nodes (24): analyticDssVary, circle, dist, line, comboDssItems, comboDssVary, med, one (+16 more)

### Community 42 - "Trig & survey variants"
Cohesion: 0.16
Nodes (24): atX(), mathDec(), radFrac(), crossStem(), CUBICS, maxStem(), minStem(), monoStem() (+16 more)

### Community 43 - "Chat tests & lectures"
Cohesion: 0.11
Nodes (21): broken, clean, daily, env(), fails, helloEn, post(), reply (+13 more)

### Community 44 - "Assessment & formula book"
Cohesion: 0.14
Nodes (21): hit, html, weather, AssessBank, assessBanks, AssessQuestion, gradeNumber(), shownLetter() (+13 more)

### Community 45 - "Variant tests"
Cohesion: 0.10
Nodes (21): assert(), banks, checkTex(), counts, fails, firstOrder, memory, posRng (+13 more)

### Community 46 - "Quadratic variants"
Cohesion: 0.19
Nodes (20): costStem(), fenceStem(), quadraticVary(), rangeStem(), rootsStem(), vertexStem(), generalQuad(), joinMath() (+12 more)

### Community 47 - "Research study log"
Cohesion: 0.15
Nodes (20): readParams(), sameParams(), saveStudy(), stageParams(), StudyLog, lessonBounds, STUDY_ROWS, studyDone() (+12 more)

### Community 48 - "App TS config"
Cohesion: 0.09
Nodes (22): compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection (+14 more)

### Community 49 - "Grade content tests"
Cohesion: 0.10
Nodes (19): allBlob, assert(), checkProse(), checks, checksEarly, fails, g10, g11 (+11 more)

### Community 50 - "Test DB & affiliate tests"
Cohesion: 0.12
Nodes (16): code, dir, env, fails, post(), rows, opened, pgliteClient() (+8 more)

### Community 51 - "Doc export tests"
Cohesion: 0.10
Nodes (19): docx, emptyCopy, emptyTask, emptyText, emptyXml, faces, memory, packed (+11 more)

### Community 52 - "Chat equation facts"
Cohesion: 0.23
Nodes (20): base, env, facts(), add(), Equation, equationFacts(), equationTex(), findEquation() (+12 more)

### Community 53 - "Inequality & combo variants"
Cohesion: 0.20
Nodes (20): comboVary(), combStem(), commStem(), factStem(), MEANS, meanStem(), orderStem(), permStem() (+12 more)

### Community 54 - "Trig lab"
Cohesion: 0.24
Nodes (20): drawCircle(), Hit, padless(), trace(), TrigLab(), BAYES_POP, COS, cosDeg() (+12 more)

### Community 55 - "Study pack model"
Cohesion: 0.19
Nodes (15): ready, Block, expand(), Inline, MathSlot, parseDoc(), parseLine(), applyScript() (+7 more)

### Community 56 - "Scripts TS config"
Cohesion: 0.10
Nodes (20): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection, moduleResolution (+12 more)

### Community 57 - "Grade desk UI"
Cohesion: 0.22
Nodes (18): lessonsOf(), GradeAsk, GradeExample, AskForm(), check(), DrillBlock(), ExampleBlock(), GradeDesk() (+10 more)

### Community 58 - "Sequence & limit variants"
Cohesion: 0.26
Nodes (18): assignStem(), contStem(), holeStem(), jumpStem(), limitVary(), teaStem(), ARITH, bounceStem() (+10 more)

### Community 59 - "Doc page & downloads"
Cohesion: 0.19
Nodes (14): downloadBytes(), clearDocDraft(), writeDocDraft(), exportDoc(), fontBytes(), DocPage(), apply(), clearDraft() (+6 more)

### Community 60 - "DSS expression helpers"
Cohesion: 0.16
Nodes (17): assert(), banks, checkTex(), fails, analyticDssItems, expDssItems, always, E (+9 more)

### Community 61 - "Store unit tests"
Cohesion: 0.11
Nodes (17): broken, fails, fresh, kept, keptScores, keptStudy, locus, memory (+9 more)

### Community 62 - "HTTP bridge tests"
Cohesion: 0.15
Nodes (13): added, echo, logged, preParsed(), server, target, CHAT_MAX_BYTES, PAY_MAX_BYTES (+5 more)

### Community 63 - "Derivative & integral DSS"
Cohesion: 0.12
Nodes (14): ball, cubic, derivativeDssItems, derivativeDssVary, flat, all(), div(), neg() (+6 more)

### Community 64 - "Survey & sequence DSS"
Cohesion: 0.14
Nodes (15): lt(), mul(), ne(), sq(), sub(), arith, four, geom (+7 more)

### Community 65 - "Exponential variants"
Cohesion: 0.17
Nodes (17): COMPOUND, compoundStem(), DECAYS, decayStem(), DOUBLES, doubleStem(), expVary(), LOGS (+9 more)

### Community 66 - "Chat env & handler"
Cohesion: 0.21
Nodes (14): handler(), Req, Res, chatEnv(), integer(), premiumNow(), quotaFor(), sharedQuota (+6 more)

### Community 67 - "Runtime dependencies"
Cohesion: 0.12
Nodes (17): dependencies, ai@^7.0.156, @ai-sdk/openai@^4.0.104, katex@^0.19.0, mermaid@^12.3.0, @pdf-lib/fontkit@^1.1.1, pg@^8.23.1, qrcode@^1.5.4 (+9 more)

### Community 68 - "Analytic geometry variants"
Cohesion: 0.18
Nodes (16): analyticVary(), CIRCLES, circleStem(), DIRS, dirStem(), distStem(), EN, footStem() (+8 more)

### Community 69 - "Research studies catalog"
Cohesion: 0.23
Nodes (8): rationalOblique(), algebraStudies, calcStudies, num(), spaceStudies, Study, StudyColumn, StudyGuess

### Community 70 - "THPT 2025 exam format"
Cohesion: 0.15
Nodes (16): dropUnusedUnknowns(), EXAM_MINUTES_2025, MCQ_GRADES, PaperScore, PART_POINTS, pickByGrade(), round2(), SHORT_GRADES (+8 more)

### Community 71 - "Node TS config"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, noEmit, noFallthroughCasesInSwitch (+8 more)

### Community 72 - "Study media generator"
Cohesion: 0.35
Nodes (8): brown(), fade(), lowpass(), main(), normalise(), pad(), rain(), waves()

### Community 73 - "Answer recording"
Cohesion: 0.28
Nodes (14): Verdict, answeredNow(), getData(), questionKey(), recordAnswer(), recordDss(), subscribe(), useSlice() (+6 more)

### Community 74 - "DSS item claims"
Cohesion: 0.19
Nodes (15): Claim, Pred, Axis, drawFacts(), Fact, publishAll(), publishItem(), quad() (+7 more)

### Community 75 - "npm scripts"
Cohesion: 0.13
Nodes (15): scripts, build, check, db:copy-sqlite, db:migrate, db:status, dev, free-llm:sync (+7 more)

### Community 76 - "Exponential lab"
Cohesion: 0.28
Nodes (14): expSummary(), drawDecay(), ExpLab(), frame(), Hit, NONE, panelMap(), baseOk() (+6 more)

### Community 77 - "Vector variants"
Cohesion: 0.21
Nodes (14): point3(), Vary, DETS, detStem(), DOTS, dotStem(), LENGTHS, lenStem() (+6 more)

### Community 78 - "DOCX & ZIP export"
Cohesion: 0.25
Nodes (13): docToDocx(), documentXml(), entry(), paragraph(), runs(), xml(), concat(), crc32() (+5 more)

### Community 79 - "PDF export"
Cohesion: 0.27
Nodes (13): pdf-lib@^1.17.1, pdf-lib, buildPdf(), FaceName, glyphSet(), inlineRuns(), piecesOf(), Run (+5 more)

### Community 80 - "Methods catalog"
Cohesion: 0.15
Nodes (11): IDS, methodIds, cards, GuideRow, Method, MethodLink, methodsData, MethodsFile (+3 more)

### Community 81 - "Topic cards & streams"
Cohesion: 0.25
Nodes (10): Card, CardId, QUESTION_TOTAL, streams, Guide, guides, LessonBit, StreamId (+2 more)

### Community 82 - "Premium routes & admin (docs)"
Cohesion: 0.18
Nodes (13): Admin manual confirm/refund (ADMIN_TOKEN), Affiliate referral program (AFFILIATE_RATE_BPS), /api/premium/* routes, Bank balance webhook (Casso/SePay), Crypto watch worker, markPaid (SELECT FOR UPDATE, payment_events), MoMo IPN signature verification, MoMo create-order signature field order (+5 more)

### Community 83 - "Triangle variants"
Cohesion: 0.24
Nodes (12): questionById(), BOXES, boxStem(), PYRS, pyrStem(), RIGHTS, rightStem(), simStem() (+4 more)

### Community 84 - "Cross-tab store sync"
Cohesion: 0.19
Nodes (13): absorb(), applyStorageEvent(), mergeData(), mergeMap(), notify(), owns(), pickValue(), readStorage() (+5 more)

### Community 85 - "Bank & MoMo flow (docs)"
Cohesion: 0.18
Nodes (8): Bank transfer with BTxxxxxxxx memo, Checklist before accepting real money, MoMo business key onboarding, 15-minute order expiry, Thanh toán Premium (payment doc), QR payment (payWithMethod), Vercel deploy (vercel.json, Node functions), VietQR (EMVCo/NAPAS, CRC-16/CCITT-FALSE)

### Community 86 - "README overview"
Cohesion: 0.20
Nodes (10): Adding a sheet procedure, Bàn Toán (README), Be Vietnam Pro self-hosted font, CI workflow (.github/workflows/ci.yml), Fourteen topic sheets (tờ), Canvas motion clips per sheet, Production service worker (offline), src/lib/math.ts shared math (+2 more)

### Community 87 - "HTTP bridge"
Cohesion: 0.29
Nodes (10): BodyTooLarge, BridgeOptions, FetchHandler, headerPairs(), headerValue(), nodeHandler(), readBody(), sendJson() (+2 more)

### Community 88 - "Diagram SVG sanitizer"
Cohesion: 0.30
Nodes (11): ATTRS, cleanAttrs(), decode(), DiagramBlock, escapeAttr(), escapeText(), KEEP, name0() (+3 more)

### Community 89 - "Derivative variants"
Cohesion: 0.32
Nodes (11): BRAKES, brakeStem(), cubicStem(), derivativeVary(), heightStem(), intervalStem(), secantStem(), slopeStem() (+3 more)

### Community 90 - "Shuffle & notes"
Cohesion: 0.33
Nodes (10): mulberry32(), shuffleIds(), dismissWrong(), setNote(), studyKey(), faceRate(), Notebook(), arrange() (+2 more)

### Community 91 - "AI gateway & free LLMs (docs)"
Cohesion: 0.22
Nodes (9): Vercel AI Gateway / OpenAI paid key, Chat demo mode (no keys), npm run free-llm:sync -> freeCatalog.ts, Free LLM providers (groq, gemini, openrouter, mistral, nvidia, zai), Trợ lý toán (math tutor, /api/chat), Provider fallback chain (FREE_LLM_ORDER, 20s/25s), npm run test:content (sympy check), sympy 1.14.0 dependency (+1 more)

### Community 92 - "Grade depth asks"
Cohesion: 0.29
Nodes (10): assumed(), deepen(), numberAsk(), numberOf(), pitfall(), spellings(), whyTrue(), WIDGET (+2 more)

### Community 93 - "Grade figures"
Cohesion: 0.31
Nodes (10): FigureKind, AngleMark(), Bars(), CircleMark(), CountDots(), GradeFigure(), LABEL, Rect() (+2 more)

### Community 94 - "Study pack builder"
Cohesion: 0.29
Nodes (10): LessonKind, buildStudyPack(), head(), KIND, Lang, oneLine(), PACK_EXAMPLES, PackSource (+2 more)

### Community 95 - "Quadratic DSS"
Cohesion: 0.18
Nodes (6): ge(), givenAD, givenHK, givenRoots, quadraticDssItems, quadraticDssVary

### Community 96 - "Fraction math helpers"
Cohesion: 0.25
Nodes (5): coefTex(), F(), Frac, fracs(), reduceTex()

### Community 97 - "Attempt slots & saving"
Cohesion: 0.20
Nodes (11): nextPos(), slotRng(), commit(), ensureAttempt(), flushSave(), freshAttempt(), resetAttempt(), saveNow() (+3 more)

### Community 98 - "Vite & PWA build"
Cohesion: 0.20
Nodes (7): vite@^8.3.0, vite-plugin-pwa@^2.0.0, @vitejs/plugin-react@^6.1.1, vite, vite-plugin-pwa, @vitejs/plugin-react, payApi()

### Community 99 - "VietQR codec"
Cohesion: 0.33
Nodes (9): buildVietQr(), crc16CcittFalse(), decodeVietQr(), emvName(), parseTlv(), tlv(), verifyVietQr(), VietQrDecoded (+1 more)

### Community 100 - "Exponential DSS"
Cohesion: 0.20
Nodes (9): compound, expDssVary, growth, logs, pairLog, rate, exp(), ln() (+1 more)

### Community 101 - "Vector DSS"
Cohesion: 0.22
Nodes (6): eq(), cross, det, perp, vectorDssItems, vectorDssVary

### Community 102 - "Inequality DSS"
Cohesion: 0.22
Nodes (7): le(), World, am, cauchy, ineqDssItems, ineqDssVary, prod

### Community 103 - "Trig DSS"
Cohesion: 0.22
Nodes (6): never, axis, quad, sine, trigDssItems, trigDssVary

### Community 104 - "Learner text scanner"
Cohesion: 0.32
Nodes (7): inMath(), problems, seen, textProblems(), walk(), topics, gradeBooks

### Community 105 - "Grade widgets"
Cohesion: 0.46
Nodes (7): GradeWidget, FractionBar(), GradeWidgetView(), Graph(), LinearSlider(), NumberLine(), QuadraticSlider()

### Community 106 - "THPT bag store"
Cohesion: 0.46
Nodes (8): choices(), emptyThptBag(), exam(), grades(), isChoice(), isRecord(), parseThptBag(), record()

### Community 107 - "PayStore backends (docs)"
Cohesion: 0.29
Nodes (7): PayStore interface (server/pay/store.ts), PGlite (WASM Postgres) tests, Postgres store (pgStore.ts, DATABASE_URL), Versioned schema MIGRATIONS under advisory lock, SQLite store (node:sqlite, PREMIUM_DB_PATH), Node 22.13+ (node:sqlite), npm run test:server (SQLite + PGlite)

### Community 108 - "Premium features (docs)"
Cohesion: 0.33
Nodes (7): Premium features (thi thử, ôn lỗi sai, tài liệu, trợ lý 40/day), Mistake review plan 1/3/7/14 days (ban-toan-review-v1), Study pack /tai-lieu with PDF/Word export, Lecture videos (basic/exam, lectures.ts), Ban Toan Sans (Liberation Sans subset), Liberation Sans (Red Hat, Reserved Font Name), SIL Open Font License 1.1

### Community 109 - "Grade types"
Cohesion: 0.29
Nodes (6): AskChoice, AskNumber, GradeBand, GradeChapter, GradeCheck, GradeStep

### Community 110 - "Probability DSS"
Cohesion: 0.29
Nodes (6): wr(), bayes, boy, dice, probabilityDssItems, probabilityDssVary

### Community 111 - "Policy & refund terms"
Cohesion: 0.52
Nodes (5): PARENT_REFUND_DAYS, PAYBACK_WORKING_DAYS, REFUND_DAYS, REPLY_WORKING_DAYS, SUPPORT_EMAIL

### Community 112 - "License & tutor limits (docs)"
Cohesion: 0.33
Nodes (5): localStorage key ban-toan-license, chat_hits rate counter table, Problem photo input (JPEG 1600px, visionModel), Premium tutor modes (solve, check, image), Chat rate limits (10/10min IP, 8 free, 40 Premium)

### Community 113 - "Storage & startup (docs)"
Cohesion: 0.33
Nodes (5): In-memory storage fallback shim, Pre-render theme/lang/lamp bootstrap script, localStorage key ban-toan, localStorage key ban-toan-room, Nghiên cứu (research) tab

### Community 114 - "Lint config"
Cohesion: 0.33
Nodes (5): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema

### Community 115 - "Supabase mirror"
Cohesion: 0.40
Nodes (5): @supabase/supabase-js@^2.119.0, @supabase/supabase-js, deviceId(), mirrorDrill(), supabase

### Community 116 - "Favicon design"
Cohesion: 0.50
Nodes (5): Brand Palette (teal #0e6b5e, cream #f7f3ea), App Favicon Logo, Parabola Curve Stroke, Point Marker Dot, Teal Rounded Square Background

### Community 118 - "Root TS config"
Cohesion: 0.40
Nodes (4): compilerOptions, rewriteRelativeImportExtensions, files, references

### Community 119 - "Icon 192 design"
Cohesion: 0.67
Nodes (4): App Icon 192px (PWA), Green Cross / Plus Motif, Parabola Curve Motif, PWA Manifest Icon (192x192)

### Community 120 - "Icon 512 design"
Cohesion: 0.67
Nodes (4): App Icon (512px), Parabola with Vertex Motif, Plus Sign Motif, PWA Icon Role

### Community 121 - "Vercel config"
Cohesion: 0.50
Nodes (3): buildCommand, outputDirectory, rewrites

## Ambiguous Edges - Review These
- `Parabola Curve Motif` → `Green Cross / Plus Motif`  [AMBIGUOUS]
  public/icon-192.png · relation: conceptually_related_to

## Knowledge Gaps
- **27 isolated node(s):** `localStorage key ban-toan-room`, `x-request-id header tracing`, `CI workflow (.github/workflows/ci.yml)`, `Static SPA deploy with 404.html fallback`, `Production service worker (offline)` (+22 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 915 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Theme & route context` to `Motion clips & chat facts`, `Lab summaries & math helpers`, `Exam review & mock exam`, `Solids & plane workshop`, `Home desk & topic catalog`, `Lesson-type (dạng) tests`, `Canvas drawing helpers`, `App shell & routes`, `Math oracles & summaries`, `Study music player logic`, `Golden math tests`, `THPT practice store`, `Upgrade & license UI`, `Chat panel UI`, `Grade practice store`, `Miss book & gap drills`, `Progress store core`, `Topic desk & captions`, `Study room scenes`, `Dev dependencies`, `Assessment & formula book`, `Research study log`, `Trig lab`, `Grade desk UI`, `Doc page & downloads`, `Runtime dependencies`, `Answer recording`, `Exponential lab`, `Grade widgets`, `Policy & refund terms`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **What connects `localStorage key ban-toan-room`, `x-request-id header tracing`, `CI workflow (.github/workflows/ci.yml)` to the rest of the system?**
  _27 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Motion clips & chat facts` be split into smaller, more focused modules?**
  _Cohesion score 0.0631889458158671 - nodes in this community are weakly interconnected._
- **Why does `katex` connect `Research & docs tests` to `Miss book & gap drills`, `Lab summaries & math helpers`, `Runtime dependencies`, `Concept pool tests`, `Solids & plane workshop`, `Home desk & topic catalog`, `Dev dependencies`, `Math check script`, `Assessment & formula book`, `Variant tests`, `Methods catalog`, `Study pack model`, `Doc page & downloads`, `DSS expression helpers`, `THPT question checks`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Should `Lab summaries & math helpers` be split into smaller, more focused modules?**
  _Cohesion score 0.07572637840311142 - nodes in this community are weakly interconnected._
- **Why does `t()` connect `Home desk & topic catalog` to `Lab summaries & math helpers`, `Exam review & mock exam`, `Solids & plane workshop`, `Canvas drawing helpers`, `App shell & routes`, `Math oracles & summaries`, `Study music player logic`, `Golden math tests`, `THPT practice store`, `Upgrade & license UI`, `Theme & route context`, `Chat panel UI`, `Grade practice store`, `Miss book & gap drills`, `Topic desk & captions`, `Study room scenes`, `Assessment & formula book`, `Research study log`, `Trig lab`, `Grade desk UI`, `Doc page & downloads`, `Answer recording`, `Exponential lab`, `Shuffle & notes`, `Policy & refund terms`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Parabola Curve Motif` and `Green Cross / Plus Motif`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._