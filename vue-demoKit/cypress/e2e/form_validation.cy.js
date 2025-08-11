// form_validation.cy.js

// describe ใช้สำหรับจัดกลุ่มเทสที่เกี่ยวข้องกัน เรียกว่า 'Test Suite'
describe('Form Validation Logic', () => {
  // beforeEach จะรันโค้ดข้างในนี้ก่อนทุกๆ 'it' บล็อก
  beforeEach(() => {
    // cy.visit บอกให้ Cypress เปิดไปที่ URL ที่กำหนด
    // ให้เปลี่ยน '/your-form-page' เป็น path จริงของหน้าฟอร์มของคุณ
    cy.visit('http://localhost:5173/form')
  })

  // it คือ 'Test Case' หรือกรณีทดสอบแต่ละกรณี
  // ✅ กรณีที่ 1: กรอกข้อมูลถูกต้องทั้งหมด
  it('should enable submit button and allow submission when all fields are valid', () => {
    // 1. ค้นหา input ของชื่อ แล้วพิมพ์ข้อความที่ถูกต้องลงไป
    cy.get('#firstName').type('สมชาย ใจดี')

    // 2. ค้นหา input ของเบอร์โทร แล้วพิมพ์เบอร์ที่ถูกต้อง
    cy.get('#phoneNumber').type('0812345678')

    // 3. ค้นหา input ของหมายเหตุ แล้วพิมพ์ข้อความที่ยาวพอ
    cy.get('#notes').type('นี่คือหมายเหตุสำหรับการทดสอบที่มีความยาวเกิน 15 ตัวอักษร')

    // 4. ตรวจสอบว่าปุ่ม submit "ไม่" ถูก disabled (คือสามารถกดได้)
    cy.get('button[type="submit"]').should('not.be.disabled')

    // 5. ลองคลิกปุ่ม submit
    cy.get('button[type="submit"]').click()

    // 6. (ตัวอย่าง) ตรวจสอบว่า URL เปลี่ยนไปหน้า "success" หลังจาก submit สำเร็จ
    cy.contains('ยืนยันการบันทึกข้อมูล').should('be.visible')
  })

  // ❌ กรณีที่ 2: กรอกข้อมูลไม่ถูกต้อง
  it('should keep submit button disabled when data is invalid', () => {
    // 1. ตรวจสอบว่าตอนเริ่มต้น ปุ่ม submit ถูก disabled อยู่
    cy.get('button[type="submit"]').should('be.disabled')

    // 2. ลองพิมพ์ชื่อที่ผิดเงื่อนไข (มีตัวเลข)
    cy.get('#firstName').type('1234')

    // 3. พิมพ์เบอร์โทรที่ถูกต้องเพื่อให้เงื่อนไขอื่นผ่าน
    cy.get('#phoneNumber').type('0987654321')
    cy.get('#notes').type('ข้อความนี้ยาวพอที่จะผ่านเงื่อนไขการตรวจสอบแล้ว')

    // 4. ตรวจสอบว่าปุ่มก็ยังคง "ถูก" disabled อยู่ เพราะชื่อยังผิด
    cy.get('button[type="submit"]').should('be.disabled')

    // 5. แก้ไขชื่อให้ถูกต้อง
    cy.get('#firstName').clear({ force: true })
    cy.get('#firstName').type('สมหวัง ตั้งใจ', { force: true })

    // 6. ตอนนี้ทุกอย่างถูกต้องแล้ว ปุ่มควรจะกดได้
    cy.get('button[type="submit"]').should('not.be.disabled')
  })
})
