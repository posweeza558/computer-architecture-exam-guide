# เว็บไซต์สอนทำข้อสอบวิชา สถาปัตยกรรมคอมพิวเตอร์ (Computer Architecture)
**รหัสวิชา:** 198322 คณะวิศวกรรมศาสตร์ มหาวิทยาลัยขอนแก่น  
**ข้อสอบครั้งที่ 2 เทอมปลาย ปีการศึกษา 2561**

---

## 🌟 ฟีเจอร์เด่นของเว็บไซต์
1. **Interactive 4-Bit Binary & Overflow Calculator:**
   - ทดลองคลิกเปลี่ยนบิต $0/1$ เพื่อดูผลการบวกทั้งแบบ Signed (Two's complement) และ Unsigned
   - แสดงตัวทด (Carry in, Carry out) และไฟแจ้งเตือน Overflow พร้อมวิเคราะห์เหตุผลเชิงลึก
   - มีปุ่มพรีเซ็ตโจทย์จริงข้อ 1.1 ถึง 1.8 ให้กดดูได้ทันที
2. **ALU Control Logic Explorer (ข้อ 2):**
   - แสดงภาพโครงสร้าง 1-bit ALU สำหรับบิต 0-30 และบิต 31 (MSB)
   - อธิบายเบื้องหลังการควบคุมสัญญาณ Ainv, Binv, CarryIn, Operation สำหรับ add, sub, and, or, nor (De Morgan), slt
3. **Multicycle 3-State Machine Stepper (ข้อ 3):**
   - เฉลยตารางการทำงาน Step 0, 1, 2 ของคำสั่ง j, beq, R-type, lw, sw
   - ตารางค่าสัญญาณควบคุมหลัก (Main Control Signals) ทั้ง 14 สัญญาณ
4. **SRL Datapath & Barrel Shifter Connection (ข้อ 4):**
   - ปุ่มสลับดูรูปภาพว่างในข้อสอบ กับรูปภาพเฉลยการเดินสายสัญญาณที่มีไฮไลต์สีชัดเจน
   - อธิบายเหตุผลที่คำสั่ง srl ใช้ `rt` เป็นตัวตั้ง ไม่ใช่ `rs` และการต่อ `shamt` เข้าสวิตช์ `s0-s4`
5. **5-Stage Pipeline Timing Calculator & Hazard Analysis (ข้อ 5):**
   - เครื่องคำนวณเวลาการรันคำสั่ง $N$ คำสั่งใน Pipeline (แสดงผลทั้ง $1\text{ ns}$ และ $1\,\mu\text{s}$)
   - สรุปความหมายของศัพท์เทคนิค Structural Hazard, Data Hazard, Control Hazard, Forwarding, Load-use Stall, Instruction Scheduling, Branch Prediction
6. **Pipeline Control Signal Propagation Mechanism (ข้อ 6):**
   - อธิบายกลไก Pipelined Control และการส่งผ่านสัญญาณผ่าน ID/EX, EX/MEM, MEM/WB
7. **Interactive Quiz Mode:**
   - แบบทดสอบประเมินความพร้อม 6 ข้อ มีตรวจคะแนนและอธิบายเฉลยทันที

---

## 🚀 วิธีการเปิดใช้งาน
### ทางเลือกที่ 1: ผ่าน Local Web Server (กำลังเปิดทำงานอยู่แล้ว)
เปิดเบราว์เซอร์ไปที่:
```
http://localhost:8080
```

### ทางเลือกที่ 2: ดับเบิลคลิกไฟล์โดยตรง
สามารถดับเบิลคลิกเปิดไฟล์ `index.html` ในโฟลเดอร์นี้เพื่อเข้าใช้งานได้ทันทีโดยไม่ต้องต่ออินเทอร์เน็ต
