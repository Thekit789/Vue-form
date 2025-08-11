<template>
  <div class="test-container">
    <Particles id="tsparticles-test" class="particles-canvas" :options="particleOptions" />
    <h1 class="test-content">
      ถ้าคุณเห็นข้อความนี้และพื้นหลังมีอนุภาค<br />แสดงว่าการติดตั้งสำเร็จแล้ว
    </h1>
  </div>
</template>

<script setup>
const particleOptions = {
  fullScreen: { enable: false },
  background: { color: { value: '#1d2a3a' } },
  particles: {
    number: { value: 50 },
    color: { value: '#ffffff' },
    links: { color: '#ffffff', enable: true },
    move: { enable: true, speed: 2 },
    size: { value: { min: 1, max: 3 } },
  },
}
</script>

<style>
/* ใช้ style แบบ global เพื่อตัดปัญหา scoped css ทั้งหมด */
html,
body,
#app,
.test-container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.test-container {
  position: relative;
}
.particles-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.test-content {
  position: relative;
  z-index: 1;
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: sans-serif;
}
</style>
