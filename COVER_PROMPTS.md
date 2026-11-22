# 「좌표로 본 라그랑주 승수」 그림 지시문 — 픽셀풍 (기본 규칙)

> **현황 (2026-11-22):** 표지·표지 축소·장면 7장(scene_s1·s2·s3·s5·s8, duel, outro) 받아서 반영 완료. 선택 그림 review_banner는 아직 없음.

## 공통 규칙 (모든 그림에 먼저 붙인다)

- **그림체: 16비트 RPG 픽셀아트.** 굵은 어두운 외곽선, 면마다 2~3단계 명암, 픽셀 격자가 보이는 선명한 가장자리. 부드러운 그라데이션·사진풍·3D 렌더 금지.
- **배경: 낮의 연구실, 흰색이 주인 화면.** 큰 창, 흰 벽, 밝은 중간 톤. 밤·네온·검은 배경 금지(해설 페이지가 흰 배경이므로).
- **그림 안에 글자·숫자·수식·로고를 넣지 않는다.** 제목과 숫자는 페이지가 얹는다. 제목 자리(표지는 오른쪽 1/3)는 비워 둔다.
- **캐릭터는 기준 그림과 같은 얼굴·옷·색.** 생성 도구에 fruitfly-lab-expressions의 캐릭터 기본 그림 4장(하루, 시아, 모아, 초파리 연구원·주판봇)과 미공개 실루엣 그림을 함께 올린다. 표정은 아래 표의 E번호를 따른다.
- **미공개 X1~X3는 실루엣만.** 짙은 남색 몸, 흰 점 눈, 표식(X1 분홍 리본, X2 청록 안경 반짝임, X3 노란 방울)만 보인다. 얼굴·정체를 드러내지 않는다.
- 표정 번호(E01~E24)는 fruitfly-lab-expressions의 expression_map.json 기준(하루 E11 긴장·E20 식은땀·E15 손사래·E07 설명·E16 뿌듯, 시아·모아 E09 생각, 초파리 E07 돋보기·E08 가리킴·E16 팔짱, 주판봇 E16 자신만만·E18 일자 눈·E20 땀, 박사 E08·E18, 미공개 E02 걱정·E16 안도·E01 환호).
- 공통 영어 머리말(모든 프롬프트 앞에 붙임):
  > 16-bit RPG pixel art, crisp pixel grid, bold dark outlines, 2–3 tone cel shading, bright daytime research lab with large windows and white walls, mostly white background, soft teal, pink, amber and navy accents, no text, no letters, no numbers, no logos, characters match the attached reference sheets exactly.

## 만드는 순서와 저장 이름

1. **표지를 먼저** 받아 그림체를 확인한다 → 확정된 표지를 나머지 요청에 참고 그림으로 함께 올린다.
2. 같은 비율끼리 3~5장씩 한 요청으로 묶는다(16:9 한 묶음, 3:2 두 묶음).
3. 받은 그림은 WebP로 바꿔 `img/`에 둔다. 한 장 150KB 안팎, 페이지 전체 600KB 이하.

| 순서 | 저장 이름 | 크기 | 쓰는 곳 |
|---|---|---|---|
| 1 | `img/cover.webp` · `img/cover_960.webp` | 1600×900 · 960×540 | 페이지 표지, og:image, 좌표축 위의 그릇 목차 카드(이미 `cover_960.webp`를 부르고 있음) |
| 2 | `img/scene_s1.webp` | 1200×800 | 1단계 등고선과 화살표 |
| 3 | `img/scene_s2.webp` | 1200×800 | 2단계 원 울타리와 직선 |
| 4 | `img/scene_s3.webp` | 1200×800 | 3·4단계 공장 |
| 5 | `img/scene_s5.webp` | 1200×800 | 5·6단계 회귀 그릇과 울타리 |
| 6 | `img/scene_s8.webp` | 1200×800 | 7·8단계 원과 마름모 |
| 7 | `img/duel.webp` | 1200×800 | 대결 |
| 8 | `img/outro.webp` | 1200×800 | 아웃트로 (표정이 대결 결과와 맞아야 함) |
| 9 | `img/review_banner.webp` | 1200×400 | 복습·시연 대시보드 머리 그림(선택) |

## 1. 표지 (16:9, 1600×900)

> [공통 머리말] Center-left: a large pixel-art floor map of a coordinate plane on the lab floor — concentric teal contour rings around a small green glowing dot, a teal circle fence and a red diamond fence around the origin, one golden glowing spot where a contour ring just touches the circle, one red spot on the diamond's right corner. In front of the map, a pink-haired girl with twin buns and a blue streak (lab assistant Haru, E11: nervous, hands clasped at chest, one sweat drop) gives her first presentation, holding a pointer. Left of her, intern Sia (long black hair, black-and-white maid-style lab outfit, E09: finger on chin, thinking) raises a hand to ask a question. Right of her, intern Moa (beige hair, maid-style lab outfit, E09: thinking) holds a notebook. Lower right corner: a small fruit-fly researcher with big red eyes and a lab coat (E08: pointing) points at the golden spot; a boxy CRT robot on tank treads holding an abacus (Abacus-bot, E16: confident) stands beside. In the back row, three dark navy silhouettes with white dot eyes (pink ribbon, teal glasses glint, yellow bell) watch worriedly from chairs. Keep the right third of the image calm and empty for a title. 16:9.

목차 썸네일(`cover_960.webp`)은 표지를 960×540으로 줄인 것. 카드에서 하루 얼굴이 잘리지 않는지 확인한다.

## 2. 장면 그림 (3:2, 1200×800)

| 이름 | 장면 프롬프트 (공통 머리말 뒤에 붙임) | 표정 |
|---|---|---|
| `scene_s1` | A pixel-art hiking-map style whiteboard with nested oval contour lines. Haru stands beside it, drawing a short red arrow that crosses one contour line at a right angle, a tiny right-angle square mark at the crossing. Sia watches, holding a protractor. One navy silhouette (pink ribbon) peeks from behind a chair, hands over mouth. | 하루 E11 → 화살표 그리는 손은 단단히, 시아 E09, X1 E02 걱정 |
| `scene_s2` | A round teal fence ring on the lab floor like a small garden wall. A long amber plank slides upward across the floor and just touches the ring at one glowing golden point; a red arrow and a thicker teal arrow rise from that point along the same line. Haru, sweating, points at the touching point; Moa looks surprised. Abacus-bot crosses his arms with flat eyes, fruit-fly researcher holds a magnifier near the point. | 하루 E20 식은땀, 모아 E24 놀람, 주판봇 E18 일자 눈 팔짱, 초파리 E07 돋보기 |
| `scene_s3` | A tiny pixel factory diorama on a table: worker figurines on the left, small machines on the right. Above the diorama floats a teal curved ribbon (isoquant) and a straight amber bar (cost line) touching it at one golden point. Moa holds a clipboard; Haru counts on her fingers; Abacus-bot proudly pushes a crowd of worker figurines forward while the fruit-fly researcher shakes his head. | 모아 E07 보고, 하루 E11, 주판봇 E16, 초파리 E16 팔짱 |
| `scene_s5` | A big translucent pixel bowl (loss bowl) on the lab table, a golden ball rolling down toward its glowing green bottom with dotted footprints. Around the bowl's center a teal ring fence stands; the ball stops where the ring blocks it. Sia leans in with a notebook; Haru, slightly more relaxed, explains with a pointer; two silhouettes (glasses, bell) relax their shoulders. | 시아 E09, 하루 E07 설명, X2·X3 E16 안도 |
| `scene_s8` | Two fences side by side on the floor: a round teal ring and a red diamond. Contour ripples from a shared center touch the ring on its smooth side and touch the diamond exactly on its pointed corner, where a small amber fan shape glows. Moa compares them; Haru flails her hands nervously, then the fruit-fly researcher points at the corner. Abacus-bot holds a sign-shaped blank board with an X mark (no text). | 모아 E09, 하루 E15 손사래, 초파리 E08, 주판봇 E20 땀 |
| `duel` | Lab arena: on the left the fruit-fly researcher stands at a glowing point where a long oval contour touches the teal ring; on the right Abacus-bot stands at a different point on the ring after dragging a rope straight from the oval's center. A referee table with the professor (Doc, glasses, lab coat) in the middle. Haru, Sia and Moa watch from benches; silhouettes cheer with small hearts. | 초파리 E16, 주판봇 E20 땀, 박사 E18 판정 |
| `outro` | Evening light just starting but still bright (keep white dominant). Haru stands proudly at the front, relieved smile, thumbs up; three navy silhouettes clap (small sparkle effects); Sia and Moa hold notebooks happily; the fruit-fly researcher crosses his arms with a satisfied nod; Abacus-bot sweats and scratches his head; Doc smiles with eyes closed, gesturing with an open hand toward a pixel chalkboard with only shapes (circle, diamond, arrows), no text. | 하루 E16 뿌듯, X1~X3 E01 환호, 초파리 E16 팔짱, 주판봇 E20 땀, 박사 E08 웃으며 가리킴 |
| `review_banner` (선택) | A wide strip: Haru at a small control desk with sliders and knobs, three silhouettes peeking over the desk, a screen showing only abstract circles, diamonds and arrows. | 하루 E07, X1~X3 E02 → E16 |

## 3. 받은 뒤 확인

- 글자·숫자가 그려져 있으면 다시 요청한다("remove all text and numbers").
- 아웃트로·대결 표정이 결과(초파리 승)와 맞는지 본다. 틀리면 기존 그림 + 캐릭터 저장소의 표정 그림을 함께 올려 **"표정만 편집"**으로 다시 요청한다.
- 미공개 실루엣에 얼굴이 생기면 다시 요청한다.
- 페이지 반영: `build/page.src.html`의 그림판 표지(`<!-- lab-cover -->`)를 `<picture>`로 바꾸고, 장면 그림은 각 단계 제목 아래에 `loading="lazy"`로 넣은 뒤 `node build/build.js`.
