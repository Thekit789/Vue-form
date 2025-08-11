<template>
  <router-view />
</template>

<script setup>
// ไม่ต้องมีโค้ดในส่วนนี้สำหรับ App.vue ในตอนนี้
</script>

<style>
/* ใช้ style แบบ global (ไม่มี scoped)
  เพื่อตั้งค่าพื้นฐานให้กับทั้งโปรเจกต์
*/

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  /* กำหนดให้พื้นหลังเป็นสีดำสนิทและซ่อน scrollbar ที่ไม่จำเป็น */
  background-color: #000;
  overflow: hidden;
}
</style>
