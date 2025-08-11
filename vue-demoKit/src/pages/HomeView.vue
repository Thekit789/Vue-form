<template>
  <div class="page-container">
    <div class="background-effects">
      <div class="stars"></div>
      <div v-for="i in 6" :key="i" class="shooting-star"></div>
    </div>

    <div class="home-container">
      <router-link to="/form" class="form-button"> Go to Form Page </router-link>
      <span class="line"></span>
      <router-link to="/form" class="form-button"> Go to Follow Page </router-link>
    </div>
  </div>
</template>

<script setup>
// ไม่จำเป็นต้องใช้ script ใดๆ เพราะเป็น CSS Animation ล้วนๆ
</script>

<style>
/* ใช้ style แบบ global (ไม่มี scoped)
  เพื่อให้ Animation และ Keyframes ทำงานได้อย่างถูกต้องกับทุก element
*/

/* --- ส่วนของพื้นหลังและ Layout หลัก --- */
.page-container {
  /* ใช้สไตล์จาก body เดิมของคุณมาไว้ที่นี่ */
  min-height: 100vh;
  background: linear-gradient(to bottom, #0b0b2b, #1b2735 70%, #090a0f);
  overflow: hidden; /* ป้องกันไม่ให้ scroll bar ปรากฏตอนดาวตกวิ่งออกนอกจอ */
  position: relative; /* ทำให้เป็นจุดอ้างอิงของ element ลูก */
}

.background-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; /* อยู่ชั้นที่ 1 (ข้างหลังสุด) */
}

/* --- ส่วนของดวงดาวและดาวตก (คัดลอกจากโค้ดที่คุณให้มา) --- */
.stars {
  width: 1px;
  height: 1px;
  position: absolute;
  background: white;
  box-shadow:
    2vw 5vh 2px white,
    10vw 8vh 2px white,
    15vw 15vh 1px white,
    22vw 22vh 1px white,
    28vw 12vh 2px white,
    32vw 32vh 1px white,
    38vw 18vh 2px white,
    42vw 35vh 1px white,
    48vw 25vh 2px white,
    53vw 42vh 1px white,
    58vw 15vh 2px white,
    63vw 38vh 1px white,
    68vw 28vh 2px white,
    73vw 45vh 1px white,
    78vw 32vh 2px white,
    83vw 48vh 1px white,
    88vw 20vh 2px white,
    93vw 52vh 1px white,
    98vw 35vh 2px white,
    5vw 60vh 1px white,
    12vw 65vh 2px white,
    18vw 72vh 1px white,
    25vw 78vh 2px white,
    30vw 85vh 1px white,
    35vw 68vh 2px white,
    40vw 82vh 1px white,
    45vw 92vh 2px white,
    50vw 75vh 1px white,
    55vw 88vh 2px white,
    60vw 95vh 1px white,
    65vw 72vh 2px white,
    70vw 85vh 1px white,
    75vw 78vh 2px white,
    80vw 92vh 1px white,
    85vw 82vh 2px white,
    90vw 88vh 1px white,
    95vw 75vh 2px white;
  animation: twinkle 8s infinite linear;
}

.stars::after {
  content: '';
  position: absolute;
  width: 1px;
  height: 1px;
  background: white;
  box-shadow:
    8vw 12vh 2px white,
    16vw 18vh 1px white,
    24vw 25vh 2px white,
    33vw 15vh 1px white,
    41vw 28vh 2px white,
    49vw 35vh 1px white,
    57vw 22vh 2px white,
    65vw 42vh 1px white,
    73vw 28vh 2px white,
    81vw 48vh 1px white,
    89vw 32vh 2px white,
    97vw 45vh 1px white,
    3vw 68vh 2px white,
    11vw 75vh 1px white,
    19vw 82vh 2px white,
    27vw 88vh 1px white,
    35vw 72vh 2px white,
    43vw 85vh 1px white,
    51vw 92vh 2px white,
    59vw 78vh 1px white;
  animation: twinkle 6s infinite linear reverse;
}

.shooting-star {
  position: absolute;
  width: 100px;
  height: 2px;
  background: linear-gradient(180deg, white, transparent);
  animation: shoot 5s infinite ease-in-out;
}

/* กำหนดตำแหน่งและ delay ให้ดาวตกแต่ละดวง */
.shooting-star:nth-child(1) {
  top: 10%;
  left: -100px;
  animation-delay: 2.5s;
}
.shooting-star:nth-child(2) {
  top: 30%;
  left: -100px;
  animation-delay: 0s;
}
.shooting-star:nth-child(3) {
  top: 50%;
  left: -100px;
  animation-delay: 1.2s;
}
.shooting-star:nth-child(4) {
  top: 70%;
  left: -100px;
  animation-delay: 4s;
}
.shooting-star:nth-child(5) {
  top: 85%;
  left: -100px;
  animation-delay: 0.5s;
}
.shooting-star:nth-child(6) {
  top: 5%;
  left: -100px;
  animation-delay: 3s;
}

/* --- Keyframes (คัดลอกจากโค้ดที่คุณให้มา) --- */
@keyframes twinkle {
  0%,
  100% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.4;
  }
}

@keyframes shoot {
  0% {
    transform: translateX(0) translateY(0) rotate(-20deg);
    opacity: 1;
  }
  100% {
    transform: translateX(120vw) translateY(-30vh) rotate(-20deg);
    opacity: 0;
  }
}

/* --- ส่วนของเนื้อหา (ปรับจากโค้ดเดิมของคุณ) --- */
.home-container {
  position: relative; /* ทำให้ z-index ทำงาน */
  z-index: 2; /* อยู่ชั้นที่ 2 (ข้างหน้าสุด) */
  height: 50vh; /* ทำให้ container สูงเต็มพื้นที่ของ .page-container */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
}

.line {
  height: 15vh;
  width: 5px;
  border-radius: 100px;
  background-color: rgba(255, 255, 255, 0.634);
  box-shadow: 0 0 20px rgba(0, 191, 255, 0.7);
}

/* .form-button {
  display: inline-block;
  padding: 12px 24px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 16px;
  transition: background-color 0.3s;
}

.form-button:hover {
  background-color: #349a6d;
} */

.form-button {
  display: inline-block;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  color: white; /* สีตัวอักษร */
  text-decoration: none;
  border-radius: 12px; /* ทำให้ขอบมนขึ้นเล็กน้อย */

  /* --- ส่วนที่ปรับปรุงใหม่ --- */
  background-color: rgba(255, 255, 255, 0.278); /* พื้นหลังโปร่งแสงเล็กน้อย */
  border: 1px solid rgba(255, 255, 255, 0.2); /* เส้นขอบโปร่งแสง */
  backdrop-filter: blur(8px); /* เอฟเฟกต์กระจกฝ้า ทำให้พื้นหลังเบลอ */
  box-shadow: 0 0 10px rgba(0, 191, 255, 0.4); /* เงาเรืองรองสีฟ้า */

  transition: all 0.3s ease; /* ทำให้ทุกการเปลี่ยนแปลงนุ่มนวล */
  cursor: pointer;
}

.form-button:hover {
  background-color: rgba(255, 255, 255, 0.2); /* ทำให้พื้นหลังสว่างขึ้นเมื่อเมาส์ชี้ */
  box-shadow: 0 0 20px rgba(0, 191, 255, 0.7); /* ทำให้เงาเรืองรองสว่างและฟุ้งขึ้น */
}
</style>
