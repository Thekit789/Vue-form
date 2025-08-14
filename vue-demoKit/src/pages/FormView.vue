<template>
  <div class="form-page-container">
    <div class="form-wrapper">
      <div class="form-header">
        <h1 class="form-title">ฟอร์มข้อมูลลูกค้าคาดหวัง</h1>
        <p class="form-subtitle">กรุณากรอกข้อมูลให้ครบถ้วน</p>
      </div>

      <form @submit.prevent="submitForm" novalidate>
        <div class="form-grid">
          <!-- First Name -->
          <div class="form-group">
            <label for="firstName" class="form-label"
              >ชื่อจริง <span class="required-star">*</span></label
            >
            <input
              type="text"
              id="firstName"
              v-model="form.firstName"
              @input="filterAlpha"
              :class="{ 'error-border': touched.firstName && !validations.isFirstNameValid }"
              class="form-input"
              placeholder="เช่น สมเด็จ"
            />
            <p v-if="touched.firstName && !validations.isFirstNameValid" class="error-message">
              กรุณากรอกชื่อจริง (เฉพาะตัวอักษร)
            </p>
          </div>

          <!-- Last Name -->
          <div class="form-group">
            <label for="lastName" class="form-label">นามสกุล</label>
            <input
              type="text"
              id="lastName"
              v-model="form.lastName"
              @input="filterAlpha"
              class="form-input"
              placeholder="เช่น ฮุนเซน"
            />
          </div>

          <!-- Phone Number -->
          <div class="form-group">
            <label for="phoneNumber" class="form-label"
              >เบอร์โทรศัพท์ <span class="required-star">*</span></label
            >
            <input
              type="tel"
              id="phoneNumber"
              v-model="form.phoneNumber"
              @input="filterNumeric"
              maxlength="10"
              :class="{ 'error-border': touched.phoneNumber && !validations.isPhoneNumberValid }"
              class="form-input"
              placeholder="เช่น 0812345678"
            />
            <p v-if="touched.phoneNumber && !validations.isPhoneNumberValid" class="error-message">
              กรุณากรอกเบอร์โทรศัพท์ 10 หลัก (เฉพาะตัวเลข)
            </p>
          </div>

          <!-- Source of Number -->
          <div class="form-group">
            <label class="form-label">ที่มาของเบอร์โทร <span class="required-star">*</span></label>
            <div class="radio-group-flex">
              <div v-for="source in sourceOfNumbers" :key="source" class="radio-item">
                <input
                  type="radio"
                  :id="source"
                  :value="source"
                  v-model="form.sourceOfNumber"
                  class="form-radio-custom"
                />
                <label :for="source" class="radio-label">{{ source }}</label>
              </div>
            </div>
          </div>

          <!-- Car Brand -->
          <div class="form-group full-width">
            <label class="form-label">ยี่ห้อรถที่สนใจ <span class="required-star">*</span></label>
            <div class="radio-group-flex">
              <div v-for="brand in carBrands" :key="brand" class="radio-item">
                <input
                  type="radio"
                  :id="brand"
                  :value="brand"
                  v-model="form.brand"
                  class="form-radio-custom"
                />
                <label :for="brand" class="radio-label">{{ brand }}</label>
              </div>
            </div>
          </div>

          <!-- Car Model Selection -->
          <div class="form-group full-width">
            <label for="carModel" class="form-label"
              >รุ่นรถ <span class="required-star">*</span></label
            >
            <select
              id="carModel"
              v-model="form.carModel"
              class="form-select"
              :disabled="!form.brand"
            >
              <option disabled value="">-- เลือกรุ่นรถ --</option>
              <template v-if="form.brand === 'Honda'">
                <option v-for="model in hondaModels" :key="model" :value="model">
                  {{ model }}
                </option>
              </template>
              <template v-if="form.brand === 'Yamaha'">
                <option v-for="model in yamahaModels" :key="model" :value="model">
                  {{ model }}
                </option>
              </template>
            </select>
            <p v-if="touched.carModel && !validations.isCarModelValid" class="error-message">
              กรุณาเลือกรุ่นรถ
            </p>
          </div>

          <!-- Sales Type -->
          <div class="form-group full-width">
            <label class="form-label">ประเภทการขาย <span class="required-star">*</span></label>
            <div class="radio-group-flex">
              <div v-for="type in salesTypes" :key="type" class="radio-item">
                <input
                  type="radio"
                  :id="type"
                  :value="type"
                  v-model="form.salesType"
                  class="form-radio-custom"
                />
                <label :for="type" class="radio-label">{{ type }}</label>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div class="form-group full-width">
            <label for="notes" class="form-label"
              >หมายเหตุ <span class="required-star">*</span></label
            >
            <textarea
              id="notes"
              v-model="form.notes"
              rows="4"
              :class="{ 'error-border': touched.notes && !validations.isNotesValid }"
              class="form-textarea"
              placeholder="ระบุรายละเอียดเพิ่มเติม... (อย่างน้อย 15 ตัวอักษร)"
            ></textarea>
            <p v-if="touched.notes && !validations.isNotesValid" class="error-message">
              กรุณากรอกหมายเหตุอย่างน้อย 15 ตัวอักษร
            </p>
          </div>
        </div>

        <div class="submit-container">
          <button type="submit" :disabled="!isFormValid" class="submit-button">บันทึกข้อมูล</button>
        </div>
      </form>
    </div>

    <!-- Confirmation Modal -->
    <transition name="fade">
      <div v-if="showConfirmModal" class="modal-overlay">
        <div class="modal-content">
          <h3 class="modal-title">ยืนยันการบันทึกข้อมูล</h3>
          <p class="modal-body">คุณต้องการยืนยันการบันทึกข้อมูลนี้ใช่หรือไม่?</p>
          <div class="modal-actions">
            <button @click="cancelSubmission" class="modal-button cancel">ยกเลิก</button>
            <button @click="confirmSubmission" class="modal-button confirm">ยืนยัน</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Success Message -->
    <transition name="fade">
      <div v-if="showSuccessMessage" class="success-message">บันทึกข้อมูลเรียบร้อยแล้ว!</div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'

// --- STATE MANAGEMENT ---
const form = reactive({
  firstName: '',
  lastName: '',
  phoneNumber: '',
  sourceOfNumber: 'เดินมาหน้าร้าน', // New field with default
  brand: 'Honda', // New field for brand selection
  carModel: '', // Will be populated by select
  salesType: 'ขายสด',
  notes: '',
})

const touched = reactive({
  firstName: false,
  phoneNumber: false,
  carModel: false, // Added for car model validation
  notes: false,
})

const showConfirmModal = ref(false)
const showSuccessMessage = ref(false)

// --- STATIC DATA ---
const sourceOfNumbers = ref(['เดินมาหน้าร้าน', 'โทรมาสอบถาม', 'ทักผ่านเพจร้าน', 'เดินตลาด'])
const carBrands = ref(['Honda', 'Yamaha'])
const hondaModels = ref([
  'Wave 110',
  'Wave 125',
  'Scoopy i',
  'Click 160',
  'Click 125',
  'Giorno',
  'Lead',
  'Forza',
  'ADV160',
  'ADV350',
])
const yamahaModels = ref([
  'Finn',
  'Exciter',
  'NMAX',
  'XSR155',
  'MT-15',
  'R15',
  'Fazzio',
  'Grand Filano',
])
const salesTypes = ref(['ขายสด', 'ขายผ่อน', 'ขายไฟแนนซ์'])

// --- VALIDATIONS ---
const validations = reactive({
  isFirstNameValid: computed(
    () => /^[a-zA-Zก-ฮะ-์\s]+$/.test(form.firstName.trim()) && form.firstName.trim().length > 0,
  ),
  isPhoneNumberValid: computed(() => /^\d{10}$/.test(form.phoneNumber.trim())),
  isCarModelValid: computed(() => form.carModel !== ''), // New validation
  isNotesValid: computed(() => form.notes.trim().length >= 15),
})

const isFormValid = computed(
  () =>
    validations.isFirstNameValid &&
    validations.isPhoneNumberValid &&
    validations.isCarModelValid &&
    validations.isNotesValid,
)

// --- METHODS ---
const filterAlpha = (event) => {
  const value = event.target.value.replace(/[^a-zA-Zก-ฮะ-์\s]/g, '')
  if (event.target.id === 'firstName') form.firstName = value
  if (event.target.id === 'lastName') form.lastName = value
}

const filterNumeric = (event) => {
  form.phoneNumber = event.target.value.replace(/\D/g, '')
}

const resetForm = () => {
  Object.assign(form, {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    sourceOfNumber: 'เดินมาหน้าร้าน',
    brand: 'Honda',
    carModel: '',
    salesType: 'ขายสด',
    notes: '',
  })
  Object.keys(touched).forEach((key) => {
    touched[key] = false
  })
}

const submitForm = () => {
  Object.keys(touched).forEach((key) => {
    touched[key] = true
  })
  if (isFormValid.value) {
    showConfirmModal.value = true
  }
}

const confirmSubmission = () => {
  const leadData = { ...form, submissionDate: new Date().toISOString() }
  console.log('--- Data Saved ---')
  console.log(JSON.stringify(leadData, null, 2))

  showConfirmModal.value = false
  showSuccessMessage.value = true

  setTimeout(() => {
    showSuccessMessage.value = false
  }, 3000)

  resetForm()
}

const cancelSubmission = () => {
  showConfirmModal.value = false
}

// --- WATCHERS ---
watch(
  () => form.brand,
  (newBrand, oldBrand) => {
    if (newBrand !== oldBrand) {
      form.carModel = '' // Reset car model when brand changes
      touched.carModel = false
    }
  },
)

watch(
  () => form.firstName,
  () => {
    touched.firstName = true
  },
)
watch(
  () => form.phoneNumber,
  () => {
    touched.phoneNumber = true
  },
)
watch(
  () => form.carModel,
  () => {
    touched.carModel = true
  },
)
watch(
  () => form.notes,
  () => {
    touched.notes = true
  },
)
</script>

<style scoped>
/* General Page Styles */
.form-page-container {
  font-family: 'Sarabun', sans-serif;
  background: linear-gradient(to bottom, #0b0b2b, #1b2735 70%, #090a0f);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.form-wrapper {
  width: 100%;
  max-width: 56rem;
  position: relative;
  background-image: linear-gradient(to bottom, #f5f8fc, #f7f8fa);
  border-radius: 1.5rem;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: 2.5rem;
}

/* Header */
.form-header {
  margin-bottom: 2rem;
  text-align: center;
}
.form-title {
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 700;
  color: #1f2937;
}
.form-subtitle {
  color: #6b7280;
  margin-top: 0.5rem;
}

/* Form Layout */
.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem 2rem;
}
@media (min-width: 768px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
.form-group.full-width {
  grid-column: 1 / -1;
}
.form-group {
  display: flex;
  flex-direction: column;
}

/* Form Elements */
.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}
.required-star {
  color: #ef4444;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 1rem;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px #bfdbfe;
}

.form-select:disabled {
  background-color: #e5e7eb;
  cursor: not-allowed;
}

/* Validation Styles */
.error-border {
  border-color: #f87171 !important;
}
.error-message {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

/* Radio Buttons */
.radio-group-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.radio-item {
  display: flex;
  align-items: center;
}
.radio-label {
  margin-left: 0.5rem;
  font-size: 0.875rem;
  color: #4b5563;
  cursor: pointer;
}
.form-radio-custom {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid #d1d5db;
  transition: all 0.2s;
  cursor: pointer;
}
.form-radio-custom:checked {
  background-color: #3b82f6;
  border-color: #3b82f6;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
}

/* Submit Button */
.submit-container {
  margin-top: 2rem;
}
.submit-button {
  width: 100%;
  color: white;
  font-weight: 700;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #2563eb;
  transition:
    background-color 0.3s,
    transform 0.2s;
  cursor: pointer;
}
.submit-button:hover:not(:disabled) {
  background-color: #1d4ed8;
  transform: scale(1.02);
}
.submit-button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
}
.modal-content {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 2rem;
  width: 100%;
  max-width: 28rem;
  text-align: center;
}
.modal-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}
.modal-body {
  color: #4b5563;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
}
.modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.modal-button {
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  transition: background-color 0.2s;
  cursor: pointer;
}
.modal-button.cancel {
  background-color: #e5e7eb;
  color: #1f2937;
}
.modal-button.cancel:hover {
  background-color: #d1d5db;
}
.modal-button.confirm {
  background-color: #2563eb;
  color: white;
}
.modal-button.confirm:hover {
  background-color: #1d4ed8;
}

/* Success Message */
.success-message {
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  background-color: #22c55e;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 50;
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
