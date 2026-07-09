---
name: ThreeTrees Wedding — Memory-Crafted
description: Landing page nhẫn cưới thiết kế riêng, kế thừa di sản kim hoàn Antwerp 143 năm
colors:
  paper: "#FBF8F1"
  ivory: "#F6F1E6"
  cream: "#EFE7D6"
  sand: "#E6DBC2"
  forest: "#26331F"
  forest-2: "#2F3E26"
  forest-deep: "#1B2415"
  olive: "#586B3F"
  ink: "#292920"
  ink-soft: "#4E4C3F"
  bone: "#F3EEE3"
  bone-dim: "#D3CCBA"
  smoke: "#948E77"
  gold: "#A9843F"
  gold-2: "#C0A05C"
  gold-bright: "#E6D09A"
typography:
  display:
    fontFamily: "Beautique Display, Minion Pro, serif"
    fontSize: "clamp(2rem, 8vw, 3.2rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "0.004em"
  serif:
    fontFamily: "Minion Pro, Georgia, Times New Roman, serif"
    fontWeight: 400
    lineHeight: 1.1
  body:
    fontFamily: "FZ Poppins, system-ui, -apple-system, sans-serif"
    fontWeight: 300
    lineHeight: 1.75
    letterSpacing: "0.005em"
  label:
    fontFamily: "FZ Poppins, system-ui, sans-serif"
    fontWeight: 500
    fontSize: "0.6rem-0.66rem"
    letterSpacing: "0.1em-0.2em"
rounded:
  none: "0px"
  pill: "50%"
spacing:
  section-pad: "7vw (desktop) / 6.5vw (≤760px) / 6vw (≤520px)"
  card-gap: "1.8rem (desktop) / 1.1rem (tablet) / 1.3rem (mobile)"
components:
  button-gold:
    backgroundColor: "{colors.gold-2}"
    textColor: "#2c2207"
    rounded: "{rounded.none}"
    padding: "1rem 1.8rem"
  button-gold-hover:
    backgroundColor: "{colors.gold-bright}"
  button-solid:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.forest}"
    rounded: "{rounded.none}"
  ring-card:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "1.5rem"
---

# Design System: ThreeTrees Wedding

## 1. Overview

**Creative North Star: "The Private Atelier Journal"**

ThreeTrees Wedding không bán nhẫn — nó kể câu chuyện của từng cặp đôi rồi mời họ bước vào một buổi tư vấn riêng. Hệ thống thị giác giống một cuốn sổ tay biên tập của một atelier kim hoàn lâu đời hơn là một sàn thương mại điện tử: nền giấy ngà ấm (paper/ivory/cream), mực forest đậm, điểm nhấn vàng đồng khắc chế — chậm rãi, nhiều khoảng trắng, chữ serif hiển thị cỡ lớn xen giữa các đoạn văn kể chuyện dài.

Hệ thống này từ chối rõ ràng: banner khuyến mãi, % giảm giá, lưới sản phẩm dày đặc kiểu chợ trang sức online, hoặc bất kỳ cảm giác "sàn thương mại" nào. Mọi section đều được phép "thở" — nhịp đọc được ưu tiên hơn mật độ thông tin.

**Key Characteristics:**
- Nền ấm trung tính (paper/ivory/cream/sand) — không trắng tinh, không tối.
- Forest xanh đậm làm mực chữ & CTA chính — không đen thuần.
- Vàng đồng (gold/gold-2/gold-bright) là gia vị hiếm, xuất hiện ở nhãn, số liệu, chữ nghiêng nhấn — không tràn lan.
- Không bo góc (border-radius: 0) ở hầu hết mọi nơi — cạnh vuông, cảm giác in ấn/thủ công hơn là app phần mềm.
- Typography là ngôi sao: serif hiển thị lớn xen giữa nhãn sans-serif uppercase tracking rộng, rất ít icon.

## 2. Colors

Bảng màu ấm, trầm, độ tương phản vừa phải — như giấy da và mực xanh rừng, điểm vàng đồng.

### Primary
- **Forest** (#26331F): mực chữ tiêu đề, nút CTA chính (btn-solid), viền khi item được chọn. Đây là màu "thương hiệu" chính, đóng vai trò như mực đóng dấu.
- **Forest Deep** (#1B2415): nền tối (overlay ảnh, phần cinema/quote), lớp gradient tối trên ảnh hero.

### Secondary
- **Gold** (#A9843F) / **Gold-2** (#C0A05C) / **Gold-bright** (#E6D09A): dải vàng đồng dùng cho nhãn mục nhỏ (eyebrow), số liệu thống kê, chữ nghiêng nhấn (`.gold` gradient text), nút CTA vàng (btn-gold), badge tối trên ảnh. Là "đồ trang sức" của chính giao diện — hiếm, lấp lánh có chủ đích.

### Neutral
- **Paper** (#FBF8F1): nền mặc định toàn trang.
- **Ivory** (#F6F1E6) / **Cream** (#EFE7D6) / **Sand** (#E6DBC2): các lớp nền phụ phân tách section (manifesto, quiz, showroom...).
- **Ink** (#292920) / **Ink-soft** (#4E4C3F): chữ nội dung (body copy).
- **Bone** (#F3EEE3) / **Bone-dim** (#D3CCBA) / **Smoke** (#948E77): chữ phụ trên nền tối, viền mờ.

### Named Rules
**The Rare Gold Rule.** Vàng đồng chỉ xuất hiện ở nhãn, số liệu, 1 CTA nổi bật mỗi section, hoặc chữ nhấn nghiêng — không bao giờ làm nền lớn hay lặp lại dày đặc trong một khung nhìn.

## 3. Typography

**Display Font:** Beautique Display (fallback Minion Pro, serif) — dùng dè sẻn cho vài chữ nhấn nghiêng.
**Body/Serif Font:** Minion Pro (fallback Georgia, Times New Roman) — toàn bộ heading h1-h4, blockquote.
**Label/UI Font:** FZ Poppins (fallback system sans) — toàn bộ body copy, nhãn, nút, form.

**Character:** Serif cổ điển mang tính "văn chương/di sản" cho tiêu đề, đối lập với sans-serif mảnh nhẹ (font-weight 300) cho phần đọc — tạo cảm giác vừa sang trọng vừa dễ đọc trên di động.

### Hierarchy
- **Display/Headline** (400, `clamp(2rem, 8vw, 3.2rem)`, line-height 1.1): H1 hero, H2 section — Minion Pro, đôi khi chữ nghiêng Beautique Display màu gold cho từ khoá cảm xúc.
- **Title** (400, ~1.3–1.65rem, line-height ~1.1-1.2): tên sản phẩm (h3 ring card), tên section phụ.
- **Essence/Accent** (400 italic, ~0.9-1.1rem, Minion Pro): dòng tagline cảm xúc dưới mỗi tên sản phẩm, màu gold.
- **Body** (300, ~0.84-1rem, line-height 1.6-1.8, FZ Poppins): đoạn mô tả, tối đa ~65-75ch mỗi dòng.
- **Label** (500, 0.56-0.66rem, letter-spacing 0.1-0.2em, UPPERCASE, FZ Poppins): eyebrow, nhãn nút, badge, meta chất liệu.

### Named Rules
**The Two-Voice Rule.** Chỉ 2 giọng chữ trong mọi khung nhìn: một dòng serif lớn (cảm xúc) + một dòng sans nhỏ uppercase (chức năng). Không chèn thêm giọng thứ ba.

## 4. Elevation

Hệ thống gần như phẳng ở trạng thái nghỉ — độ sâu chỉ xuất hiện như phản hồi tương tác (hover nâng thẻ lên, viền đổi màu), không dùng shadow trang trí tĩnh. Viền mảnh (`--line`, `--line-gold`) đảm nhiệm việc phân tách thay cho bóng đổ ở phần lớn giao diện.

### Shadow Vocabulary
- **shadow-soft** (`0 20px 50px -30px rgba(38,51,31,.4)`): hover nâng thẻ (ring-card, qr-item), nút gold hover — bóng lan toả nhẹ, không viền cứng.
- **shadow** (`0 30px 80px -42px rgba(38,51,31,.5)`): nhấn mạnh trạng thái "đã chọn" (ring-card.selected) kết hợp với viền forest.

### Named Rules
**The Hover-Only Depth Rule.** Không thẻ nào có bóng đổ khi đứng yên. Bóng chỉ xuất hiện khi hover/selected — depth là một phản hồi, không phải trang trí mặc định.

## 5. Components

### Buttons
- **Shape:** vuông cạnh hoàn toàn (border-radius: 0), padding rộng rãi (~0.9-1.05rem dọc, 1.5-1.8rem ngang), min-height 52px trên mobile để đủ vùng chạm.
- **Primary (btn-gold):** nền gold-2 (#C0A05C), chữ #2c2207, hover chuyển gold-bright + shadow-soft. Dùng cho CTA quan trọng nhất mỗi section (1 nút/section).
- **Solid (btn-solid):** nền forest, chữ paper, hover forest-2 + shadow-soft. Dùng cho CTA form/thứ cấp.
- **Line (btn-line / btn-line-light):** viền 1px, nền trong suốt, chữ forest (hoặc paper trên nền tối). Dùng khi có CTA khác nổi bật hơn trong cùng khung nhìn.
- **Label:** uppercase, letter-spacing 0.1-0.2em, font-weight 500, cỡ rất nhỏ (0.6-0.66rem) — tương phản cố ý với cỡ chữ heading lớn bên cạnh.

### Cards / Containers (ring-card, qr-item, feat-media)
- **Corner Style:** vuông cạnh (0 radius).
- **Background:** paper, viền `--line` mảnh (rgba forest 13%).
- **Shadow Strategy:** phẳng khi nghỉ, `shadow-soft` + dịch `translateY(-4px)` + viền chuyển `line-gold` khi hover (xem Elevation).
- **Border:** 1px solid `--line`; khi "đã chọn" chuyển `--forest` + shadow.
- **Internal Padding:** ~1.2-1.5rem, ảnh full-bleed aspect-ratio 4/3 phía trên.
- **Badge overlay:** nhãn tối (rgba forest 82-88%) góc ảnh, chữ gold-bright, uppercase nhỏ — dùng cho chất liệu/trạng thái nổi bật, không dùng icon.

### Inputs / Fields (appoint-form)
- **Style:** viền dưới hoặc viền mảnh `--line`, nền paper/ivory, không bo góc.
- **Focus:** outline 1px gold, offset 4px (`:focus-visible`).
- **Label:** sans nhỏ phía trên field, dấu `*` gold cho trường bắt buộc.

### Navigation
- **Style:** thanh nav trong suốt → nền paper khi scroll (`.scrolled`), logo serif + tagline sans nhỏ. Link uppercase nhỏ, gạch chân gold mở rộng khi hover. Trên mobile: nav rút gọn còn logo + hamburger, menu phụ là drawer full-screen dạng danh sách số thứ tự lớn.

### Signature Component: Reveal-on-scroll (`.rv`)
Toàn bộ khối nội dung có class `.rv` ẩn nhẹ (opacity 0, translateY 20px) và hiện dần khi cuộn tới (IntersectionObserver), có fallback hiện ngay nếu JS lỗi hoặc `prefers-reduced-motion`. Đây là nhịp chuyển động chủ đạo của toàn trang — chậm rãi, không nảy (ease `cubic-bezier(.19,1,.22,1)`).

## 6. Do's and Don'ts

### Do:
- **Do** giữ nền ấm trung tính (paper/ivory/cream/sand) làm nền mặc định — đây là bảng màu đã cam kết, không đổi sang trắng/tối thuần.
- **Do** giữ cạnh vuông (radius 0) cho mọi nút, thẻ, ảnh, badge — bo góc phá vỡ cảm giác "in ấn/thủ công" đã thiết lập.
- **Do** dùng vàng đồng (gold/gold-2/gold-bright) hiếm và có chủ đích — nhãn, số liệu, 1 CTA/section, không phủ nền lớn.
- **Do** ưu tiên khoảng trắng và nhịp đọc chậm trên mọi section, đặc biệt mobile — nội dung phải gọn, không phóng to kiểu desktop-thu-nhỏ.
- **Do** dùng bóng đổ (`shadow-soft`) chỉ như phản hồi hover/selected, không trang trí tĩnh.

### Don't:
- **Don't** thêm banner khuyến mãi, badge giảm giá %, hoặc bất kỳ yếu tố nào gợi cảm giác "sàn kim hoàn đại trà".
- **Don't** dùng lưới sản phẩm dày đặc kiểu e-commerce — mỗi khung nhìn nên có nhịp thở, không nhồi nhét nhiều thẻ cùng lúc trên mobile.
- **Don't** thêm màu ngoài bảng forest/gold/paper hệ hiện tại (không thêm accent lạ như xanh dương, đỏ, tím).
- **Don't** bo góc thẻ/nút/ảnh — phá vỡ "The Two-Voice Rule" của hệ thống vuông cạnh.
- **Don't** để hiệu ứng chuyển động nảy (bounce/elastic) — mọi easing phải mượt, chậm rãi kiểu editorial, tôn trọng `prefers-reduced-motion`.
