# StudyFlow — JavaScript + DOM Project Assignment

## Bối cảnh dự án

Bạn được cung cấp sẵn giao diện của một ứng dụng quản lý công việc học tập tên **StudyFlow**.

Project đã có:

- `index.html` — giao diện hoàn chỉnh.
- `style.css` — giao diện và các trạng thái hiển thị đã được chuẩn bị.
- `script.js` — file JavaScript đang để trống.

Nhiệm vụ của bạn là viết JavaScript để biến giao diện tĩnh này thành một ứng dụng có thể sử dụng thực tế.

### Quy định

- Chỉ làm việc chủ yếu trong `script.js`.
- Không sửa HTML hoặc CSS trừ khi giáo viên cho phép.
- Không sử dụng framework hoặc thư viện JavaScript bên ngoài.
- Không viết JavaScript trực tiếp trong file HTML.
- Khi hoàn thành, toàn bộ chức năng bên dưới phải hoạt động cùng nhau, không chỉ hoạt động riêng lẻ.

---

# 1. Khởi tạo ứng dụng

Khi trang vừa được mở, ứng dụng phải ở trạng thái sẵn sàng để sử dụng.

Bạn cần chuẩn bị dữ liệu để chương trình có thể lưu nhiều task khác nhau trong quá trình người dùng sử dụng trang.

Mỗi task cần ghi nhớ được tối thiểu các thông tin sau:

- một mã định danh riêng để phân biệt task với các task khác;
- tên task;
- môn/chủ đề;
- độ ưu tiên;
- số phút dự kiến;
- task đã hoàn thành hay chưa;
- thời điểm task được tạo.

### Yêu cầu hành vi

- Hai task khác nhau không được bị nhầm lẫn khi complete hoặc delete.
- Số phút phải được xử lý như dữ liệu số để sau này có thể tính tổng.
- Trạng thái hoàn thành phải có đúng hai trạng thái: hoàn thành hoặc chưa hoàn thành.
- Task mới tạo phải có thời gian tạo mới hơn task cũ.

### Khi mới mở trang

Bạn có thể bắt đầu với một số task mẫu để dễ kiểm tra chương trình. Ví dụ:

- Review JavaScript arrays
- Practice querySelector
- Improve responsive layout

Khi project hoàn thiện, các task mẫu này vẫn có thể được giữ lại để demo.

---

# 2. Hiển thị danh sách task

Khu vực **Your tasks** phải luôn phản ánh đúng dữ liệu hiện tại của ứng dụng.

Với mỗi task đang được hiển thị, người dùng phải nhìn thấy:

- checkbox để đánh dấu hoàn thành;
- tên task;
- subject;
- priority;
- số phút dự kiến;
- nút `Delete`.

### Trạng thái chưa hoàn thành

Một task chưa hoàn thành phải:

- có checkbox chưa được chọn;
- hiển thị theo style bình thường.

### Trạng thái đã hoàn thành

Một task đã hoàn thành phải:

- có checkbox được chọn;
- có giao diện completed theo CSS đã cung cấp.

### Khi không có task để hiển thị

Khối **Nothing to show** phải xuất hiện nếu danh sách hiện tại không có kết quả.

Ví dụ:

- chưa có task nào;
- đang chọn filter `Completed` nhưng chưa task nào hoàn thành;
- search không tìm thấy kết quả;
- filter và search kết hợp tạo ra 0 kết quả.

Nếu có ít nhất một task được hiển thị thì khối **Nothing to show** phải ẩn đi.

### Dòng thông báo kết quả

Dòng chữ dưới tiêu đề **Your tasks** phải cho người dùng biết số task đang được hiển thị so với tổng số task hiện có.

Ví dụ:

```text
3 of 5 tasks shown
```

Nếu toàn bộ 5 task đều đang hiển thị:

```text
5 of 5 tasks shown
```

---

# 3. Thêm task mới

Người dùng nhập thông tin trong form **Add a study task** và nhấn nút `+ Add task`.

Khi submit form, trang **không được reload**.

Bạn cần lấy các giá trị hiện tại từ:

- Task title
- Subject
- Priority
- Estimated minutes

Sau đó kiểm tra dữ liệu trước khi tạo task.

## 3.1. Kiểm tra Task title

Không cho phép thêm task nếu title chỉ có khoảng trắng hoặc không có ký tự nào.

Ví dụ không hợp lệ:

```text
""
"   "
```

Không cho phép title ngắn hơn 3 ký tự sau khi bỏ khoảng trắng ở đầu và cuối.

Ví dụ:

```text
JS
A
```

đều không hợp lệ.

Nếu title không hợp lệ, hiển thị thông báo phù hợp tại vị trí error dưới form.

Task không được thêm vào danh sách.

## 3.2. Kiểm tra Estimated minutes

Estimated minutes chỉ hợp lệ khi nằm trong khoảng:

```text
5 đến 240 phút
```

Ví dụ:

- `4` → không hợp lệ;
- `5` → hợp lệ;
- `60` → hợp lệ;
- `240` → hợp lệ;
- `241` → không hợp lệ.

Nếu không hợp lệ, hiển thị lỗi và không thêm task.

## 3.3. Khi dữ liệu hợp lệ

Khi toàn bộ dữ liệu hợp lệ:

1. Tạo một task mới từ dữ liệu trong form.
2. Task mới phải có id riêng.
3. Task mới mặc định là chưa hoàn thành.
4. Ghi lại thời điểm task được tạo.
5. Thêm task vào dữ liệu của ứng dụng.
6. Xóa thông báo lỗi cũ nếu có.
7. Reset form về trạng thái ban đầu.
8. Priority quay về `Medium`.
9. Estimated minutes quay về `30`.
10. Con trỏ nhập liệu quay lại ô Task title.
11. Task mới phải xuất hiện trên giao diện ngay lập tức.
12. Các thống kê phải cập nhật ngay.

---

# 4. Đánh dấu task hoàn thành

Khi người dùng click checkbox của một task chưa hoàn thành:

- đúng task đó phải chuyển sang trạng thái completed;
- checkbox của task đó phải được chọn;
- giao diện completed phải xuất hiện;
- số `Completed` tăng lên 1;
- số `Remaining` giảm xuống 1;
- `Minutes left` giảm đúng số phút của task vừa hoàn thành.

Ví dụ:

Ban đầu có:

```text
Task A — 30 phút — active
Task B — 45 phút — active
```

Statistics:

```text
Total: 2
Completed: 0
Remaining: 2
Minutes left: 75
```

Sau khi complete Task A:

```text
Total: 2
Completed: 1
Remaining: 1
Minutes left: 45
```

### Bỏ trạng thái completed

Nếu người dùng click lại checkbox của một task completed:

- task phải trở lại trạng thái active;
- checkbox bỏ chọn;
- style completed biến mất;
- statistics cập nhật ngược lại chính xác.

Chức năng này phải hoạt động với mọi task, kể cả task được tạo mới sau khi trang đã load.

---

# 5. Xóa một task

Khi người dùng click `Delete` trên một task, **không được xóa ngay lập tức**.

Thay vào đó, modal xác nhận phải mở ra.

Modal gồm:

- tiêu đề `Delete task?`;
- nút `Cancel`;
- nút `Delete` màu đỏ;
- nút `×` ở góc;
- overlay phía sau.

Ứng dụng phải ghi nhớ chính xác task nào đang chờ được xóa.

## 5.1. Xác nhận xóa

Nếu người dùng click nút `Delete` màu đỏ trong modal:

- chỉ task đã chọn trước đó bị xóa;
- các task khác giữ nguyên;
- modal đóng lại;
- overlay biến mất;
- danh sách render lại;
- statistics cập nhật lại;
- dòng số lượng kết quả cập nhật lại.

## 5.2. Hủy xóa

Nếu người dùng click `Cancel`:

- modal đóng;
- không có task nào bị xóa.

## 5.3. Đóng bằng nút ×

Nếu click `×`:

- modal đóng;
- không có task nào bị xóa.

## 5.4. Đóng bằng overlay

Nếu click vào vùng tối bên ngoài modal:

- modal đóng;
- không có task nào bị xóa.

## 5.5. Đóng bằng bàn phím

Nếu modal đang mở và người dùng nhấn phím `Escape`:

- modal phải đóng;
- không có task nào bị xóa.

Nếu modal đang đóng, nhấn `Escape` không được làm hỏng hoặc thay đổi dữ liệu.

---

# 6. Filter task

Ứng dụng có 4 nút filter:

```text
All
Active
Completed
High priority
```

Tại một thời điểm chỉ có **một filter chính** đang được chọn.

Nút filter đang được chọn phải có class/style `active` đã được CSS chuẩn bị.

## 6.1. All

Khi chọn `All`:

- hiển thị tất cả task phù hợp với search hiện tại;
- không quan tâm completed hay priority.

## 6.2. Active

Khi chọn `Active`:

- chỉ hiển thị task chưa hoàn thành.

## 6.3. Completed

Khi chọn `Completed`:

- chỉ hiển thị task đã hoàn thành.

## 6.4. High priority

Khi chọn `High priority`:

- chỉ hiển thị task có priority là High.

### Ví dụ

Có 4 task:

```text
A — High — Active
B — Medium — Active
C — High — Completed
D — Low — Completed
```

Kết quả mong đợi:

```text
All           → A, B, C, D
Active        → A, B
Completed     → C, D
High priority → A, C
```

Mỗi lần đổi filter, danh sách và dòng kết quả phải cập nhật ngay.

Statistics phía trên vẫn đại diện cho **toàn bộ task trong ứng dụng**, không chỉ task đang được filter.

---

# 7. Search task

Ô Search phải hoạt động ngay khi người dùng đang gõ, không cần nhấn Enter.

Search phải kiểm tra cả:

- task title;
- subject.

Search không phân biệt chữ hoa và chữ thường.

### Ví dụ

Nếu có task:

```text
Practice DOM selectors
Subject: DOM
```

Các từ sau đều phải tìm thấy task:

```text
dom
DOM
Dom
practice
selector
```

Nếu subject là `JavaScript`, search:

```text
javascript
JavaScript
script
```

phải xử lý theo nội dung thực tế của chuỗi.

### Khoảng trắng

Khoảng trắng thừa ở đầu/cuối search không được làm kết quả sai.

Ví dụ:

```text
"   dom   "
```

nên cho kết quả tương tự:

```text
"dom"
```

---

# 8. Kết hợp Search và Filter

Search và Filter không được hoạt động độc lập theo kiểu làm mất tác dụng của nhau.

Chúng phải kết hợp.

### Ví dụ

Có:

```text
Practice DOM events       — DOM        — Active
Review DOM selectors      — DOM        — Completed
Practice array methods    — JavaScript — Active
```

Nếu:

```text
Filter = Active
Search = dom
```

chỉ hiển thị:

```text
Practice DOM events
```

Nếu:

```text
Filter = Completed
Search = dom
```

chỉ hiển thị:

```text
Review DOM selectors
```

Nếu search không còn nội dung, ứng dụng quay về hiển thị theo filter hiện tại.

---

# 9. Sort task

Dropdown Sort có 4 lựa chọn:

```text
Newest first
Oldest first
Priority
Estimated minutes
```

Sort phải áp dụng lên **kết quả hiện tại sau khi filter và search**.

## 9.1. Newest first

Task được tạo gần đây nhất xuất hiện phía trên.

Ví dụ thứ tự tạo:

```text
Task A → tạo trước
Task B → tạo sau
Task C → tạo cuối cùng
```

Kết quả:

```text
C
B
A
```

## 9.2. Oldest first

Task được tạo trước xuất hiện phía trên.

Kết quả với ví dụ trên:

```text
A
B
C
```

## 9.3. Priority

Thứ tự ưu tiên phải là:

```text
High
Medium
Low
```

Task High phải nằm trước Medium, Medium nằm trước Low.

## 9.4. Estimated minutes

Task có số phút lớn hơn phải xuất hiện trước task có số phút nhỏ hơn.

Ví dụ:

```text
Task A — 30 phút
Task B — 90 phút
Task C — 45 phút
```

Kết quả:

```text
Task B — 90
Task C — 45
Task A — 30
```

### Yêu cầu kết hợp

Nếu người dùng:

1. chọn filter;
2. nhập search;
3. đổi sort;

thì cả 3 điều kiện phải cùng có hiệu lực.

---

# 10. Statistics

Bốn ô statistics phải luôn cập nhật đúng theo toàn bộ dữ liệu hiện tại.

## Total

Tổng số task hiện có.

Ví dụ có 7 task:

```text
Total = 7
```

## Completed

Số task đang ở trạng thái hoàn thành.

Ví dụ 3 trong 7 task completed:

```text
Completed = 3
```

## Remaining

Số task chưa hoàn thành.

Với ví dụ trên:

```text
Remaining = 4
```

## Minutes left

Tổng số phút của **các task chưa hoàn thành**.

Ví dụ:

```text
Task A — 30 phút — completed
Task B — 45 phút — active
Task C — 60 phút — active
Task D — 20 phút — completed
```

Kết quả:

```text
Minutes left = 105
```

vì chỉ tính:

```text
45 + 60
```

### Statistics phải cập nhật sau mọi thay đổi dữ liệu

Bao gồm ít nhất:

- thêm task;
- complete task;
- uncomplete task;
- delete task;
- clear completed.

Filter, search và sort **không được làm thay đổi statistics tổng**.

---

# 11. Clear completed

Khi người dùng click nút `Clear completed`:

- xóa tất cả task đã hoàn thành;
- giữ nguyên tất cả task chưa hoàn thành.

### Ví dụ

Trước khi click:

```text
A — Active
B — Completed
C — Completed
D — Active
```

Sau khi click:

```text
A — Active
D — Active
```

Sau thao tác:

- danh sách phải cập nhật;
- statistics phải cập nhật;
- filter/search/sort hiện tại tiếp tục có hiệu lực.

Nếu không có completed task nào thì click nút không được gây lỗi.

---

# 12. Dark mode / Light mode

Nút theme ở góc trên phải chuyển đổi giữa hai chế độ.

## Khi đang ở Light mode

Nút hiển thị:

```text
🌙 Dark mode
```

Khi click:

- trang chuyển sang dark mode;
- nút đổi thành:

```text
☀️ Light mode
```

## Khi đang ở Dark mode

Click lại:

- trang quay về light mode;
- nút quay lại:

```text
🌙 Dark mode
```

Có thể chuyển đổi qua lại nhiều lần mà không ảnh hưởng đến task data.

---

# 13. Các chức năng phải tiếp tục hoạt động với task mới

Đây là yêu cầu quan trọng.

Không được chỉ làm chức năng hoạt động với các task có sẵn ban đầu.

Sau khi người dùng thêm một task mới, task đó cũng phải:

- complete/uncomplete được;
- delete được;
- xuất hiện đúng trong filter;
- tìm được bằng search;
- được sắp xếp đúng;
- được tính trong statistics;
- bị xóa nếu completed và người dùng chọn Clear completed.

---

# 14. Chuỗi thao tác tổng hợp bắt buộc phải hoạt động

Hãy kiểm tra scenario sau từ đầu đến cuối.

## Scenario A

1. Mở trang.
2. Thêm task `Practice callbacks`.
3. Chọn subject `JavaScript`.
4. Chọn priority `High`.
5. Nhập `60` phút.
6. Submit.
7. Task xuất hiện.
8. Total tăng lên 1.
9. Remaining tăng lên 1.
10. Minutes left tăng thêm 60.
11. Complete task đó.
12. Completed tăng 1.
13. Remaining giảm 1.
14. Minutes left giảm 60.
15. Chọn filter `Completed`.
16. Task vẫn xuất hiện.
17. Search `callback`.
18. Task vẫn xuất hiện.
19. Xóa nội dung search.
20. Click Delete trên task.
21. Modal mở.
22. Click Cancel.
23. Task vẫn còn.
24. Click Delete lần nữa.
25. Click Delete trong modal.
26. Task biến mất.
27. Statistics cập nhật chính xác.

## Scenario B

1. Thêm 3 task với priority High, Medium và Low.
2. Cho số phút lần lượt là 30, 90 và 45.
3. Chọn sort `Priority`.
4. Kiểm tra thứ tự High → Medium → Low.
5. Chọn sort `Estimated minutes`.
6. Kiểm tra thứ tự 90 → 45 → 30.
7. Complete hai task.
8. Chọn filter `Active`.
9. Chỉ task chưa hoàn thành còn hiển thị.
10. Click `Clear completed`.
11. Chuyển filter về `All`.
12. Hai task completed trước đó phải không còn tồn tại.

---

# 15. Xử lý các trường hợp đặc biệt

Ứng dụng không được crash hoặc cho kết quả sai trong các trường hợp sau.

### Trường hợp 1 — Danh sách rỗng

Không có task nào nhưng người dùng:

- search;
- đổi filter;
- đổi sort;
- click Clear completed.

Trang vẫn phải hoạt động bình thường.

### Trường hợp 2 — Search không tìm thấy gì

Hiển thị empty state nhưng dữ liệu task gốc không được mất.

Khi xóa search, task phải xuất hiện trở lại.

### Trường hợp 3 — Filter không có kết quả

Ví dụ không có completed task nhưng chọn `Completed`.

Hiển thị empty state.

Khi đổi về `All`, dữ liệu phải xuất hiện trở lại.

### Trường hợp 4 — Delete rồi đổi filter

Sau khi xóa task, task đó không được xuất hiện lại khi đổi filter/search/sort.

### Trường hợp 5 — Complete rồi search/filter

Trạng thái completed của task phải được giữ đúng khi task tạm thời bị ẩn rồi hiển thị lại.

### Trường hợp 6 — Nhiều thao tác liên tục

Người dùng có thể:

```text
add → complete → filter → search → sort → delete → clear search
```

mà ứng dụng vẫn phải phản ánh đúng dữ liệu cuối cùng.

---

# 16. Yêu cầu về tổ chức code

Code cần được tổ chức để dễ đọc và dễ sửa.

Không viết toàn bộ project trong một event listener duy nhất.

Hãy chia logic thành các phần có trách nhiệm rõ ràng, ví dụ:

- phần quản lý dữ liệu;
- phần validate form;
- phần tạo giao diện task;
- phần cập nhật danh sách;
- phần cập nhật statistics;
- phần modal;
- phần filter/search/sort;
- phần event handling.

Tên biến và tên function phải thể hiện được mục đích.

Không copy/paste cùng một đoạn logic ở nhiều nơi nếu có thể tái sử dụng.

Không để lại `console.log()` debug không cần thiết trong bài nộp cuối cùng.

---

# 17. Điều kiện hoàn thành bài

Bài được xem là hoàn thành khi tất cả các chức năng sau hoạt động chính xác:

- [ ] Trang không reload khi submit form.
- [ ] Không thể thêm title rỗng.
- [ ] Không thể thêm title dưới 3 ký tự.
- [ ] Không thể thêm estimated minutes dưới 5.
- [ ] Không thể thêm estimated minutes trên 240.
- [ ] Task hợp lệ được thêm ngay vào danh sách.
- [ ] Form reset đúng sau khi thêm task.
- [ ] Có thể thêm nhiều task liên tiếp.
- [ ] Task mới có id riêng và không thao tác nhầm task khác.
- [ ] Có thể complete một task.
- [ ] Có thể đưa completed task trở lại active.
- [ ] Giao diện completed cập nhật đúng.
- [ ] Delete lần đầu chỉ mở modal, chưa xóa task.
- [ ] Cancel đóng modal và không xóa task.
- [ ] Nút × đóng modal và không xóa task.
- [ ] Click overlay đóng modal và không xóa task.
- [ ] Escape đóng modal và không xóa task.
- [ ] Confirm Delete chỉ xóa đúng task đã chọn.
- [ ] Filter All hoạt động.
- [ ] Filter Active hoạt động.
- [ ] Filter Completed hoạt động.
- [ ] Filter High priority hoạt động.
- [ ] Nút filter active hiển thị đúng.
- [ ] Search hoạt động khi đang gõ.
- [ ] Search không phân biệt hoa/thường.
- [ ] Search tìm được theo title.
- [ ] Search tìm được theo subject.
- [ ] Search kết hợp đúng với filter.
- [ ] Sort Newest first hoạt động.
- [ ] Sort Oldest first hoạt động.
- [ ] Sort Priority hoạt động theo High → Medium → Low.
- [ ] Sort Estimated minutes hoạt động từ lớn xuống nhỏ.
- [ ] Sort kết hợp đúng với filter và search.
- [ ] Total luôn đúng.
- [ ] Completed luôn đúng.
- [ ] Remaining luôn đúng.
- [ ] Minutes left chỉ tính task chưa hoàn thành.
- [ ] Statistics không bị thay đổi chỉ vì filter/search/sort.
- [ ] Clear completed xóa toàn bộ completed task.
- [ ] Clear completed không xóa active task.
- [ ] Empty state hiển thị khi không có kết quả.
- [ ] Empty state ẩn khi có kết quả.
- [ ] Dòng `x of y tasks shown` luôn đúng.
- [ ] Dark mode hoạt động.
- [ ] Light mode hoạt động khi toggle lại.
- [ ] Task thêm mới hỗ trợ đầy đủ mọi chức năng như task ban đầu.
- [ ] Không có error JavaScript trong Console khi thực hiện các thao tác bình thường.

---

# 18. Cách tự kiểm tra trước khi nộp

Trước khi nộp bài, hãy mở DevTools → Console và kiểm tra trong lúc sử dụng app.

Bài chưa sẵn sàng để nộp nếu Console xuất hiện lỗi màu đỏ khi:

- thêm task;
- complete/uncomplete;
- delete;
- mở/đóng modal;
- filter;
- search;
- sort;
- clear completed;
- toggle theme.

Sau đó reload trang và chạy lại ít nhất **Scenario A** và **Scenario B** ở trên từ đầu đến cuối.

---

# Bonus Challenges

Các phần dưới đây không bắt buộc nếu giáo viên không yêu cầu.

## Bonus 1 — Persist data

Sau khi reload trang, task vẫn còn thay vì mất hết.

## Bonus 2 — Persist theme

Nếu người dùng đang dùng Dark mode rồi reload trang, ứng dụng vẫn mở ở Dark mode.

## Bonus 3 — Edit task

Thêm khả năng sửa:

- title;
- subject;
- priority;
- estimated minutes.

Sau khi sửa, filter/search/sort/statistics vẫn phải đúng.

## Bonus 4 — Due date

Cho phép mỗi task có deadline và thêm sort theo deadline.

## Bonus 5 — Better UX

Khi không có completed task, nút `Clear completed` có thể tự disabled.
