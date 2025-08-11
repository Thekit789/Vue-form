<template>
  <div class="home-container">
    <router-link to="/form" class="form-button"> Go to Form Page </router-link>
    <span class="line"></span>
    <router-link to="/form" class="form-button"> Go to Follow Page </router-link>
  </div>
</template>

<script setup></script>

<style>
/* กำหนดให้ container หลักและพื้นหลังเต็มหน้าจอ */
html,
body,
#app,
.page-container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

/* แก้ไข .home-container เดิมให้ลอยอยู่ข้างหน้า */
.home-container {
  text-align: center;
  /* จัดให้อยู่กลางหน้าจอแนวตั้ง */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  height: 50%; /* ทำให้ container สูงเต็มจอ */
}

.line {
  height: 25%; /* กำหนดความสูงที่แน่นอน */
  width: 5px;
  background-color: #42b983;
  border-radius: 100px;
}

.form-button {
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
}
</style>
