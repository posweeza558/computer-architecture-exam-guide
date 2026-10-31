/* ========================================================
   Computer Architecture Exam Guide - Interactive Logic
   Course: 198322 Computer Architecture
   ======================================================== */

// Global State
let currentTab = 'overview';
let calcMode = 'signed'; // 'signed' or 'unsigned'
let op1Bits = [0, 0, 1, 0]; // b3, b2, b1, b0 (0b0010 = 2)
let op2Bits = [0, 1, 0, 0]; // b3, b2, b1, b0 (0b0100 = 4)

// Presets from Exam Q1
const q1Presets = [
  { mode: 'signed', op1: [0, 0, 1, 0], op2: [0, 1, 0, 0] }, // 1.1: 0b0010 + 0b0100
  { mode: 'unsigned', op1: [0, 0, 1, 0], op2: [0, 1, 0, 0] }, // 1.2: 0b0010 + 0b0100
  { mode: 'signed', op1: [0, 1, 0, 1], op2: [0, 1, 1, 0] }, // 1.3: 0b0101 + 0b0110
  { mode: 'unsigned', op1: [0, 1, 0, 1], op2: [0, 1, 1, 0] }, // 1.4: 0b0101 + 0b0110
  { mode: 'signed', op1: [1, 1, 1, 1], op2: [1, 0, 1, 1] }, // 1.5: 0b1111 + 0b1011
  { mode: 'signed', op1: [1, 0, 0, 1], op2: [1, 0, 1, 1] }, // 1.6: 0b1001 + 0b1011
  { mode: 'signed', op1: [1, 0, 0, 1], op2: [0, 0, 1, 1] }, // 1.7: 0b1001 + 0b0011
  { mode: 'signed', op1: [0, 1, 1, 1], op2: [1, 0, 0, 0] }, // 1.8: 0b0111 + 0b1000
];

// Quiz Questions
const quizQuestions = [
  {
    id: 1,
    title: 'คำถามที่ 1: การเกิด Signed Overflow ในระบบ 4 บิต',
    desc: 'เมื่อทำการบวกแบบ Signed Addition ระหว่าง 0b0101 (+5) กับ 0b0110 (+6) ผลลัพธ์ใน 4 บิตคืออะไร และเกิด Overflow หรือไม่?',
    options: [
      { text: 'Result = 1011, Overflow = False เพราะไม่มี Carry out', correct: false },
      { text: 'Result = 1011, Overflow = True เพราะบวกกับบวกได้ผลลัพธ์เป็นลบ (เกินช่วง [-8, 7])', correct: true },
      { text: 'Result = 0011, Overflow = True เพราะค่าล้นรอบ 4 บิต', correct: false },
      { text: 'Result = 1011, Overflow = False เพราะสามารถเก็บค่า 11 ในระบบฐานสองได้', correct: false }
    ],
    explanation: 'ถูกต้อง! ในระบบ Signed (Two\'s complement 4 บิต) ช่วงค่าที่รับได้คือ [-8, +7] แต่ (+5) + (+6) = +11 ซึ่งเกินขอบบน ผลบวกบิตต่อบิตได้ 1011 ซึ่ง MSB เป็น 1 (กลายเป็น -5) การที่บวกกับบวกได้ผลลัพธ์เป็นลบ ถือเป็น Signed Overflow อย่างชัดเจน!'
  },
  {
    id: 2,
    title: 'คำถามที่ 2: การตั้งสัญญาณ ALU เพื่อให้ได้ฟังก์ชัน NOR',
    desc: 'จากโครงสร้าง 1-bit ALU ในรูปที่ 1 หากต้องการให้ ALU ทำหน้าที่เป็นเกต NOR ( ~(A | B) ) โดยใช้กฎของเดอมอร์แกน จะต้องตั้งสัญญาณอย่างไร?',
    options: [
      { text: 'Ainv = 0, Binv = 0, CarryIn = 0, Operation = 01 (OR)', correct: false },
      { text: 'Ainv = 1, Binv = 1, CarryIn = 0, Operation = 00 (AND)', correct: true },
      { text: 'Ainv = 1, Binv = 0, CarryIn = 1, Operation = 10 (Adder)', correct: false },
      { text: 'Ainv = 0, Binv = 1, CarryIn = 1, Operation = 11 (Less)', correct: false }
    ],
    explanation: 'ถูกต้อง! กฎ De Morgan กล่าวว่า ~(A | B) = ~A & ~B ดังนั้นเราจึงกลับบิตอินพุตทั้งสองตัวด้วย Ainv = 1 และ Binv = 1 แล้วนำไปเข้าช่องสัญญาณ 00 ซึ่งเป็นเกต AND นั่นเอง!'
  },
  {
    id: 3,
    title: 'คำถามที่ 3: สัญญาณควบคุมคำสั่ง sw ใน State 2 ของ Multicycle Machine',
    desc: 'ในตารางที่ 3 และตารางที่ 4 ของ 3-State Machine เมื่อคำสั่ง Store (sw) ทำงานใน Step 2 จะมีการทำงานและสัญญาณควบคุมใดที่ active?',
    options: [
      { text: 'Mem[ALUOut] <= B โดยมีสัญญาณ IorD = 1 และ MemWrite = 1', correct: true },
      { text: 'Reg[rt] <= Mem[ALUOut] โดยมีสัญญาณ MemRead = 1 และ RegWrite = 1', correct: false },
      { text: 'ALUOut <= A + signext โดยมีสัญญาณ ALUSrcA = 1 และ ALUSrcB = 10', correct: false },
      { text: 'PC <= ALUOut โดยมีสัญญาณ PCSource = 01 และ PCWrite = 1', correct: false }
    ],
    explanation: 'ถูกต้อง! ใน State 2 ของ sw คือจังหวะเขียนข้อมูลลง Memory: Mem[ALUOut] <= B โดยต้องส่งแอดเดรสจาก ALUOut (IorD = 1) และเปิดสัญญาณบันทึกข้อมูล (MemWrite = 1) ส่วนการคำนวณแอดเดรสทำเสร็จสิ้นไปแล้วตั้งแต่ State 1'
  },
  {
    id: 4,
    title: 'คำถามที่ 4: การต่อสายสัญญาณคำสั่ง srl (Shift Right Logical)',
    desc: 'สำหรับคำสั่ง srl rd, rt, shamt ข้อมูล 32 บิตที่ป้อนเข้า "Data in" ของ Barrel Shifter นำมาจากส่วนใด?',
    options: [
      { text: 'นำมาจาก Read data 1 โดยช่อง Read register ต่อมาจาก IR[25:21] (rs)', correct: false },
      { text: 'นำมาจาก Read data ของ Register File โดยช่องอ่านต่อมาจาก IR[20:16] (rt)', correct: true },
      { text: 'นำมาจากฟิลด์ IR[10:6] (shamt) โดยตรง', correct: false },
      { text: 'นำมาจาก Read data 2 โดยช่องอ่านต่อมาจาก IR[15:11] (rd)', correct: false }
    ],
    explanation: 'ถูกต้อง! ในคำสั่ง srl ของ MIPS รีจิสเตอร์ตัวตั้งที่จะนำมาเลื่อนบิตถูกเก็บไว้ในฟิลด์ rt (IR[20:16]) ไม่ใช่ rs (rs ไม่ได้ใช้งาน) ดังนั้นจึงต้องต่อ IR[20:16] เข้าช่องอ่านของ Register File แล้วดึงค่า 32 บิตที่อ่านได้ไปเข้า Data in ของ Barrel Shifter'
  },
  {
    id: 5,
    title: 'คำถามที่ 5: Pipeline Hazard ชนิด Load-Use',
    desc: 'หากคำสั่งที่ 1 คือ lw $s0, 0($s5) และคำสั่งที่ 2 คือ addi $s1, $s0, 1 ทำไมถึงไม่สามารถใช้ Forwarding แก้ปัญหาได้ทันทีใน clock 4?',
    options: [
      { text: 'เพราะรีจิสเตอร์ $s0 ถูกล็อคไม่ให้เขียนจนกว่าโปรแกรมจะจบ', correct: false },
      { text: 'เพราะข้อมูลจาก lw จะออกจาก Data Memory ตอนปลาย clk 4 แต่ addi ต้องการใช้ใน EX stage ตั้งแต่ต้น clk 4 ทำให้ต้อง Stall 1 clock', correct: true },
      { text: 'เพราะ Forwarding ทำงานได้เฉพาะคำสั่ง R-type เท่านั้น คำสั่ง I-type ใช้ไม่ได้', correct: false },
      { text: 'เพราะหน่วยความจำถูกแย่งใช้ระหว่างคำสั่งทั้งสอง (Structural Hazard)', correct: false }
    ],
    explanation: 'ถูกต้อง! ข้อมูลของคำสั่ง lw จะอ่านเสร็จใน MEM stage (ปลาย clk 4) ในขณะที่คำสั่งถัดไปต้องการใช้ใน EX stage (clk 4) ซึ่งย้อนเวลาไม่ได้ จึงเกิด Load-use Data Hazard และจำเป็นต้องพัก (Stall/Bubble) 1 clock cycle!'
  },
  {
    id: 6,
    title: 'คำถามที่ 6: กลไก Pipelined Control Signal Propagation',
    desc: 'เหตุใด stages อื่นๆ เช่น EX, MEM, WB จึงได้รับสัญญาณควบคุมที่ถูกต้องตรงกับคำสั่งของตนเอง ทั้งที่มีวงจร Control Unit แค่ชุดเดียวที่ ID stage?',
    options: [
      { text: 'เพราะใช้สัญญาณไร้สายส่งไปยังแต่ละ stage โดยตรง', correct: false },
      { text: 'เพราะวงจร Control Unit ส่งสัญญาณควบคุมทั้งหมดไปพร้อมกับคำสั่ง โดยส่งต่อผ่าน Stage Registers (ID/EX, EX/MEM, MEM/WB) ทีละจังหวะ clock', correct: true },
      { text: 'เพราะแต่ละ stage มี Control Unit ซ่อนอยู่ภายในอีกชุดหนึ่ง', correct: false },
      { text: 'เพราะคอมพิวเตอร์รอให้คำสั่งแรกผ่านจนครบ WB ก่อน จึงค่อยส่งสัญญาณคำสั่งถัดไป', correct: false }
    ],
    explanation: 'ถูกต้อง! สัญญาณควบคุมทั้งหมดจะถูกถอดรหัสใน ID stage แล้วบรรจุลงใน Pipeline Stage Registers ส่งต่อไปตามท่อพร้อมกับคำสั่งนั้นๆ ทีละขั้น ทำให้แต่ละ stage ได้รับสัญญาณตรงกับคำสั่งที่กำลังทำงานอยู่เสมอ'
  }
];

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initBitCalculator();
  renderQuiz();
  calculatePipelineTime();

  // KaTeX auto-render
  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ]
    });
  }
});

// Theme Management
function initTheme() {
  const toggleBtn = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  toggleBtn.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  });
}

// Tab Switching
function switchTab(tabId) {
  // Update Buttons
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.remove('active', 'bg-blue-600', 'text-white');
    if (tab.id === `tab-${tabId}`) {
      tab.classList.add('active');
    }
  });

  // Update Content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.add('hidden');
  });

  const activeContent = document.getElementById(`content-${tabId}`);
  if (activeContent) {
    activeContent.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  currentTab = tabId;
}

// Scroll to simulator within tab
function scrollToSimulator(qid) {
  const sim = document.getElementById(`sim-${qid}`);
  if (sim) {
    sim.scrollIntoView({ behavior: 'smooth' });
  }
}

// Image Zoom Modal
function zoomImage(src, title) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');

  modalImg.src = src;
  modalTitle.textContent = title || 'ภาพขยาย';
  modal.classList.remove('hidden');
}

function closeImageModal() {
  const modal = document.getElementById('imageModal');
  modal.classList.add('hidden');
}

// Q4 Toggle blank vs solved diagram
function toggleQ4Image(isSolved) {
  const img = document.getElementById('q4-active-img');
  const btnSolved = document.getElementById('btn-show-solved-q4');
  const btnBlank = document.getElementById('btn-show-blank-q4');

  if (isSolved) {
    img.src = 'images/q4_srl_wiring_solution.png';
    btnSolved.classList.add('bg-white', 'dark:bg-amber-600', 'text-amber-600', 'dark:text-white', 'shadow-sm', 'font-bold');
    btnSolved.classList.remove('text-slate-600', 'dark:text-slate-400');
    btnBlank.classList.remove('bg-white', 'dark:bg-amber-600', 'text-amber-600', 'dark:text-white', 'shadow-sm', 'font-bold');
    btnBlank.classList.add('text-slate-600', 'dark:text-slate-400');
  } else {
    img.src = 'images/page_6_img_1_Im8.png';
    btnBlank.classList.add('bg-white', 'dark:bg-amber-600', 'text-amber-600', 'dark:text-white', 'shadow-sm', 'font-bold');
    btnBlank.classList.remove('text-slate-600', 'dark:text-slate-400');
    btnSolved.classList.remove('bg-white', 'dark:bg-amber-600', 'text-amber-600', 'dark:text-white', 'shadow-sm', 'font-bold');
    btnSolved.classList.add('text-slate-600', 'dark:text-slate-400');
  }
}

/* ========================================================
   4-Bit Binary & Overflow Calculator Logic
   ======================================================== */
function initBitCalculator() {
  updateBitUI();
  calculate4Bit();
}

function setCalcMode(mode) {
  calcMode = mode;
  const signedBtn = document.getElementById('calc-signed-btn');
  const unsignedBtn = document.getElementById('calc-unsigned-btn');

  if (mode === 'signed') {
    signedBtn.className = 'px-4 py-1.5 rounded-lg text-xs font-bold bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-sm transition';
    unsignedBtn.className = 'px-4 py-1.5 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 transition';
  } else {
    unsignedBtn.className = 'px-4 py-1.5 rounded-lg text-xs font-bold bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-sm transition';
    signedBtn.className = 'px-4 py-1.5 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 transition';
  }

  calculate4Bit();
}

function loadQ1Preset(index) {
  const preset = q1Presets[index];
  if (!preset) return;
  setCalcMode(preset.mode);
  op1Bits = [...preset.op1];
  op2Bits = [...preset.op2];
  updateBitUI();
  calculate4Bit();
}

function toggleBit(op, bitIdx) {
  if (op === 'op1') {
    op1Bits[3 - bitIdx] = op1Bits[3 - bitIdx] === 0 ? 1 : 0;
  } else {
    op2Bits[3 - bitIdx] = op2Bits[3 - bitIdx] === 0 ? 1 : 0;
  }
  updateBitUI();
  calculate4Bit();
}

function updateBitUI() {
  for (let i = 0; i < 4; i++) {
    const bitVal1 = op1Bits[3 - i];
    const btn1 = document.getElementById(`op1-b${i}`);
    if (btn1) {
      btn1.textContent = bitVal1;
      btn1.className = `bit-btn w-12 h-12 rounded-xl border font-mono font-bold text-lg flex items-center justify-center ${bitVal1 === 1 ? 'bit-1' : 'bit-0'}`;
    }

    const bitVal2 = op2Bits[3 - i];
    const btn2 = document.getElementById(`op2-b${i}`);
    if (btn2) {
      btn2.textContent = bitVal2;
      btn2.className = `bit-btn w-12 h-12 rounded-xl border font-mono font-bold text-lg flex items-center justify-center ${bitVal2 === 1 ? 'bit-1' : 'bit-0'}`;
    }
  }
}

// Convert 4-bit array to integer
function bitsToDec(bits, isSigned) {
  const unsignedVal = (bits[0] << 3) | (bits[1] << 2) | (bits[2] << 1) | bits[3];
  if (!isSigned) return unsignedVal;
  return bits[0] === 1 ? unsignedVal - 16 : unsignedVal;
}

function calculate4Bit() {
  const isSigned = calcMode === 'signed';
  const val1 = bitsToDec(op1Bits, isSigned);
  const val2 = bitsToDec(op2Bits, isSigned);

  document.getElementById('op1-decimal').textContent = (isSigned && val1 >= 0 ? '+' : '') + val1;
  document.getElementById('op2-decimal').textContent = (isSigned && val2 >= 0 ? '+' : '') + val2;

  // Perform full binary adder bit-by-bit
  let carry = 0;
  const resultBits = [0, 0, 0, 0];
  const carries = [0, 0, 0, 0, 0]; // carries in/out

  for (let i = 3; i >= 0; i--) {
    const a = op1Bits[i];
    const b = op2Bits[i];
    const sum = a + b + carry;
    resultBits[i] = sum % 2;
    carry = Math.floor(sum / 2);
    carries[i] = carry; // carry out of bit (3-i)
  }

  const carryOutMSB = carry; // Carry out of bit 3
  const carryInMSB = carries[1]; // Carry in to bit 3 (which is carry out of bit 2)

  const resBinaryStr = resultBits.join('');
  document.getElementById('res-binary').textContent = resBinaryStr;

  const resVal = bitsToDec(resultBits, isSigned);
  document.getElementById('res-dec-tag').textContent = `ค่าทศนิยม: ${(isSigned && resVal >= 0 ? '+' : '') + resVal}`;

  const badgeCarry = document.getElementById('badge-carry');
  badgeCarry.textContent = carryOutMSB;

  let isOverflow = false;
  let reasonText = '';

  if (isSigned) {
    // Signed Overflow condition: (pos+pos=neg) or (neg+neg=pos) OR (Cin != Cout of MSB)
    const sign1 = op1Bits[0];
    const sign2 = op2Bits[0];
    const resSign = resultBits[0];

    if (sign1 === 0 && sign2 === 0 && resSign === 1) {
      isOverflow = true;
      reasonText = `💥 เกิด Signed Overflow! เพราะตัวตั้งเป็นบวก (${val1}) บวกกับตัวบวกที่เป็นบวก (${val2}) แต่ได้ผลลัพธ์ติดลบ (${resVal}) ซึ่งผลลัพธ์ทางคณิตศาสตร์แท้จริง (${val1 + val2}) เกินขอบเขตสูงสุด (+7) ของ 4 บิต! (CarryIn เข้า MSB = ${carryInMSB}, CarryOut จาก MSB = ${carryOutMSB})`;
    } else if (sign1 === 1 && sign2 === 1 && resSign === 0) {
      isOverflow = true;
      reasonText = `💥 เกิด Signed Overflow! เพราะตัวตั้งติดลบ (${val1}) บวกกับตัวตั้งติดลบ (${val2}) แต่ผลลัพธ์กลับได้เป็นบวก (${resVal}) ซึ่งผลลัพธ์แท้จริง (${val1 + val2}) ต่ำกว่าขอบเขตล่างสุด (-8) ของ 4 บิต! (CarryIn เข้า MSB = ${carryInMSB}, CarryOut จาก MSB = ${carryOutMSB})`;
    } else {
      isOverflow = false;
      if (sign1 !== sign2) {
        reasonText = `✅ ไม่เกิด Signed Overflow แน่นอน: เนื่องจากการบวกจำนวนต่างเครื่องหมาย (บวกกับลบ) ผลลัพธ์ย่อมอยู่ในช่วงระหว่างค่าทั้งสองเสมอ (ไม่มีวันล้นช่วง [-8, +7])`;
      } else {
        reasonText = `✅ ไม่เกิด Overflow: ผลบวกแท้จริง (${val1 + val2}) อยู่ในช่วงที่ระบบ 4-bit Signed รับได้พอดี ([-8, +7]) เครื่องหมายถูกต้องตรงตามหลักคณิตศาสตร์`;
      }
    }
  } else {
    // Unsigned Overflow condition: CarryOut of MSB is 1
    if (carryOutMSB === 1) {
      isOverflow = true;
      reasonText = `💥 เกิด Unsigned Overflow! เพราะผลบวกทางคณิตศาสตร์ (${val1} + ${val2} = ${val1 + val2}) มีค่าเกิน 15 ซึ่งเป็นค่าสูงสุดที่ 4 บิตรับได้ ทำให้มีบิตทดหลุดออกไปทาง Carry Out = 1`;
    } else {
      isOverflow = false;
      reasonText = `✅ ไม่เกิด Unsigned Overflow: ผลบวก (${val1} + ${val2} = ${val1 + val2}) อยู่ในช่วง [0, 15] พอดี ไม่มี Carry Out หลุด 4 บิต (Carry Out = 0)`;
    }
  }

  // Update Badge
  const badgeOverflow = document.getElementById('badge-overflow');
  if (isOverflow) {
    badgeOverflow.textContent = 'TRUE';
    badgeOverflow.className = 'inline-block mt-0.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 badge-overflow-true';
  } else {
    badgeOverflow.textContent = 'FALSE';
    badgeOverflow.className = 'inline-block mt-0.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400';
  }

  document.getElementById('overflow-reason-box').textContent = reasonText;
}

/* ========================================================
   Pipeline Time Calculator Logic
   ======================================================== */
function calculatePipelineTime() {
  const inputN = document.getElementById('input-pipe-n');
  let n = parseInt(inputN.value, 10);
  if (isNaN(n) || n < 1) n = 1;

  const k = 5; // 5 stages
  const cycles = k + (n - 1);

  document.getElementById('calc-pipe-cycles').textContent = `${cycles.toLocaleString()} Cycles`;

  // Hardware true: 1GHz => 1ns
  if (cycles >= 1000000) {
    const ms = cycles / 1000000;
    document.getElementById('calc-pipe-time-ns').textContent = `${cycles.toLocaleString()} ns (~${ms.toFixed(4)} ms)`;
  } else if (cycles >= 1000) {
    const us = cycles / 1000;
    document.getElementById('calc-pipe-time-ns').textContent = `${cycles.toLocaleString()} ns (~${us.toFixed(3)} µs)`;
  } else {
    document.getElementById('calc-pipe-time-ns').textContent = `${cycles.toLocaleString()} ns`;
  }

  // As written in exam (1µs per cycle)
  if (cycles >= 1000000) {
    const sec = cycles / 1000000;
    document.getElementById('calc-pipe-time-us').textContent = `${cycles.toLocaleString()} µs (~${sec.toFixed(4)} s)`;
  } else if (cycles >= 1000) {
    const ms = cycles / 1000;
    document.getElementById('calc-pipe-time-us').textContent = `${cycles.toLocaleString()} µs (~${ms.toFixed(3)} ms)`;
  } else {
    document.getElementById('calc-pipe-time-us').textContent = `${cycles.toLocaleString()} µs`;
  }
}

/* ========================================================
   Interactive Quiz Renderer & Checker
   ======================================================== */
let userAnswers = {};

function renderQuiz() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  container.innerHTML = '';

  quizQuestions.forEach((q, idx) => {
    const card = document.createElement('div');
    card.className = 'glass-card rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 space-y-4';
    card.id = `quiz-card-${q.id}`;

    let optionsHtml = '';
    q.options.forEach((opt, optIdx) => {
      optionsHtml += `
        <label class="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition text-sm">
          <input type="radio" name="question-${q.id}" value="${optIdx}" onchange="selectQuizOption(${q.id}, ${optIdx})" class="mt-1 text-blue-600 focus:ring-blue-500">
          <span class="text-slate-700 dark:text-slate-200 leading-normal">${opt.text}</span>
        </label>
      `;
    });

    card.innerHTML = `
      <div class="flex items-start justify-between gap-4">
        <div>
          <span class="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">ข้อที่ ${idx + 1} จาก 6</span>
          <h3 class="font-bold text-base sm:text-lg text-slate-900 dark:text-white mt-1">${q.title}</h3>
        </div>
        <span id="quiz-status-${q.id}" class="hidden px-2.5 py-1 rounded text-xs font-bold"></span>
      </div>
      <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">${q.desc}</p>
      <div class="space-y-2.5 pt-2">
        ${optionsHtml}
      </div>
      <div id="quiz-feedback-${q.id}" class="hidden p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed border mt-3"></div>
    `;

    container.appendChild(card);
  });
}

function selectQuizOption(qid, optIdx) {
  userAnswers[qid] = optIdx;
  const q = quizQuestions.find(item => item.id === qid);
  const isCorrect = q.options[optIdx].correct;

  const statusBadge = document.getElementById(`quiz-status-${qid}`);
  const feedbackBox = document.getElementById(`quiz-feedback-${qid}`);

  statusBadge.classList.remove('hidden');
  feedbackBox.classList.remove('hidden');

  if (isCorrect) {
    statusBadge.textContent = 'ถูกต้อง ✓';
    statusBadge.className = 'px-2.5 py-1 rounded text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300';
    feedbackBox.className = 'p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed border bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200';
  } else {
    statusBadge.textContent = 'ไม่ถูกต้อง ✗';
    statusBadge.className = 'px-2.5 py-1 rounded text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300';
    feedbackBox.className = 'p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed border bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200';
  }

  feedbackBox.innerHTML = `<strong>เฉลยและเหตุผล:</strong> ${q.explanation}`;

  updateQuizScore();
}

function updateQuizScore() {
  let score = 0;
  quizQuestions.forEach(q => {
    if (userAnswers[q.id] !== undefined && q.options[userAnswers[q.id]].correct) {
      score++;
    }
  });

  const scoreDisplay = document.getElementById('quiz-score-display');
  if (scoreDisplay) {
    scoreDisplay.textContent = `คะแนน: ${score} / ${quizQuestions.length}`;
    if (score === quizQuestions.length) {
      scoreDisplay.className = 'px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 font-mono font-bold text-sm';
    }
  }
}

function resetQuiz() {
  userAnswers = {};
  renderQuiz();
  const scoreDisplay = document.getElementById('quiz-score-display');
  if (scoreDisplay) {
    scoreDisplay.textContent = 'คะแนน: 0 / 6';
    scoreDisplay.className = 'px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono font-bold text-sm text-slate-700 dark:text-slate-300';
  }
}
