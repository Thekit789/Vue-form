<template>
  <div class="page-container">
    <div class="main-content">
      <!-- Top Section: Search and Follow-up Forms -->
      <div class="top-section-grid">
        <!-- Search Card -->
        <div class="card">
          <h2 class="card-title">ค้นหาลูกค้า</h2>
          <div class="form-group">
            <label for="searchName" class="form-label">ชื่อ / นามสกุล</label>
            <input
              type="text"
              id="searchName"
              v-model="search.name"
              class="form-input"
              placeholder="ค้นหาด้วยชื่อ..."
            />
          </div>
          <div class="form-group search-group-spacing">
            <label for="searchPhone" class="form-label">เบอร์โทรศัพท์</label>
            <input
              type="text"
              id="searchPhone"
              v-model="search.phone"
              class="form-input"
              placeholder="ค้นหาด้วยเบอร์โทร..."
            />
          </div>
        </div>

        <!-- Follow-up Card -->
        <div class="card">
          <h2 class="card-title">
            บันทึกการติดตาม
            <span v-if="selectedCustomer" class="selected-customer-name"
              >- {{ selectedCustomer.name }}</span
            >
          </h2>
          <form @submit.prevent="handleFollowUpSubmit">
            <div class="follow-up-form">
              <!-- Call Status -->
              <div class="form-group">
                <label class="form-label">อัพเดทการโทร</label>
                <div class="radio-group-grid-followup">
                  <div v-for="status in callStatuses" :key="status" class="radio-item">
                    <input
                      type="radio"
                      :id="status"
                      :value="status"
                      v-model="followUp.callStatus"
                      class="form-radio-custom"
                    />
                    <label :for="status" class="radio-label">{{ status }}</label>
                  </div>
                </div>
              </div>

              <!-- Fieldset for conditional disabling -->
              <fieldset class="appointment-scheduling-section" :disabled="isFollowUpFormDisabled">
                <div class="follow-up-grid">
                  <!-- Appointment Date & Time -->
                  <div class="form-group">
                    <label for="appointmentDate" class="form-label">วันที่ลูกค้านัด</label>
                    <input
                      type="date"
                      id="appointmentDate"
                      v-model="followUp.appointmentDate"
                      class="form-input"
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-label">ช่วงเวลา</label>
                    <div class="radio-group-flex">
                      <div v-for="slot in timeSlots" :key="slot" class="radio-item">
                        <input
                          type="radio"
                          :id="slot"
                          :value="slot"
                          v-model="followUp.timeSlot"
                          class="form-radio-custom"
                        />
                        <label :for="slot" class="radio-label">{{ slot }}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>

              <!-- Appointment Follow-up (Conditional) -->
              <div v-if="followUp.appointmentDate" class="conditional-section">
                <div class="form-group">
                  <label class="form-label">ติดตามการนัด</label>
                  <div class="radio-group-flex">
                    <div v-for="status in appointmentStatuses" :key="status" class="radio-item">
                      <input
                        type="radio"
                        :id="`appt-${status}`"
                        :value="status"
                        v-model="followUp.appointmentStatus"
                        class="form-radio-custom"
                      />
                      <label :for="`appt-${status}`" class="radio-label">{{ status }}</label>
                    </div>
                  </div>
                </div>

                <!-- Showed Up Section -->
                <div
                  v-if="followUp.appointmentStatus === 'มาตามนัด'"
                  class="follow-up-grid sub-section"
                >
                  <div class="form-group">
                    <label class="form-label">ลูกค้าทำเรื่อง</label>
                    <div class="radio-group-flex">
                      <div v-for="status in customerStatuses" :key="status" class="radio-item">
                        <input
                          type="radio"
                          :id="`cust-${status}`"
                          :value="status"
                          v-model="followUp.customerStatus"
                          class="form-radio-custom"
                        />
                        <label :for="`cust-${status}`" class="radio-label">{{ status }}</label>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">ประเภทการขาย</label>
                    <div class="radio-group-flex">
                      <div v-for="type in salesTypes" :key="type" class="radio-item">
                        <input
                          type="radio"
                          :id="`sale-${type}`"
                          :value="type"
                          v-model="followUp.salesType"
                          class="form-radio-custom"
                        />
                        <label :for="`sale-${type}`" class="radio-label">{{ type }}</label>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- No-Show Section -->
                <div
                  v-if="followUp.appointmentStatus === 'ไม่มาตามนัด'"
                  class="form-group sub-section"
                >
                  <label class="form-label">การติดตามเพิ่มเติม</label>
                  <div class="radio-group-flex">
                    <div v-for="type in furtherFollowUpTypes" :key="type" class="radio-item">
                      <input
                        type="radio"
                        :id="`further-${type}`"
                        :value="type"
                        v-model="followUp.furtherFollowUp"
                        class="form-radio-custom"
                      />
                      <label :for="`further-${type}`" class="radio-label">{{ type }}</label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Notes -->
              <div
                class="form-group"
                :class="{ 'highlight-notes': followUp.callStatus === 'ลูกค้าไม่สะดวกคุย' }"
              >
                <label for="followUpNotes" class="form-label">หมายเหตุ</label>
                <textarea
                  id="followUpNotes"
                  v-model="followUp.notes"
                  rows="3"
                  class="form-textarea"
                  placeholder="เพิ่มหมายเหตุ..."
                ></textarea>
              </div>
            </div>
            <div class="submit-container">
              <button type="submit" class="submit-button" :disabled="isSaveButtonDisabled">
                บันทึกการติดตาม
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Bottom Section: Customer Data Table -->
      <div class="card data-table-card">
        <h2 class="card-title">ข้อมูลลูกค้าที่ส่งมาจากสาขา</h2>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>ลำดับ</th>
                <th>สาขา</th>
                <th>วันที่</th>
                <th>ชื่อ-สกุล</th>
                <th>เบอร์โทร</th>
                <th>ประเภทการขาย</th>
                <th>รุ่นรถ</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(customer, index) in filteredCustomers"
                :key="customer.id"
                @click="selectCustomer(customer)"
                :class="{ 'selected-row': selectedCustomer && selectedCustomer.id === customer.id }"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ customer.branch }}</td>
                <td>{{ customer.date }}</td>
                <td>{{ customer.name }}</td>
                <td>{{ customer.phone }}</td>
                <td>{{ customer.salesType }}</td>
                <td>{{ customer.carModel }}</td>
              </tr>
              <tr v-if="filteredCustomers.length === 0">
                <td colspan="7" class="no-data">ไม่พบข้อมูลลูกค้า</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <transition name="fade">
      <div v-if="showConfirmModal" class="modal-overlay">
        <div class="modal-content">
          <h3 class="modal-title">ยืนยันการบันทึกข้อมูล</h3>
          <p class="modal-body">คุณต้องการยืนยันการบันทึกการติดตามนี้ใช่หรือไม่?</p>
          <div class="modal-actions">
            <button @click="cancelFollowUpSubmission" class="modal-button cancel">ยกเลิก</button>
            <button @click="confirmFollowUpSubmission" class="modal-button confirm">ยืนยัน</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Success Message -->
    <transition name="fade">
      <div v-if="showSuccessMessage" class="success-message">บันทึกการติดตามเรียบร้อยแล้ว!</div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'

// --- SEARCH & SELECTED STATE ---
const search = reactive({ name: '', phone: '' })
const selectedCustomer = ref(null)

// --- MODAL & MESSAGE STATE ---
const showConfirmModal = ref(false)
const showSuccessMessage = ref(false)

// --- FOLLOW-UP FORM STATE ---
const followUp = reactive({
  callStatus: 'ลูกค้าสะดวกคุย',
  appointmentDate: '',
  timeSlot: 'ช่วงเช้า',
  appointmentStatus: '', // 'มาตามนัด' or 'ไม่มาตามนัด'
  customerStatus: 'ผ่าน',
  salesType: 'ขายสด',
  furtherFollowUp: '',
  notes: '',
})

// --- STATIC OPTIONS ---
const callStatuses = ref([
  'ลูกค้าสะดวกคุย',
  'ลูกค้าไม่สะดวกคุย',
  'โทรติด/ไม่รับสาย',
  'โทรไม่ติด',
  'เบอร์ผิด',
])
const timeSlots = ref(['ช่วงเช้า', 'ช่วงบ่าย'])
const appointmentStatuses = ref(['มาตามนัด', 'ไม่มาตามนัด'])
const customerStatuses = ref(['ผ่าน', 'ไม่ผ่าน'])
const salesTypes = ref(['ขายสด', 'ขายผ่อน', 'ขายไฟแนนซ์'])
const furtherFollowUpTypes = ref(['ติดต่อภายในอาทิตย์', 'ติดต่อภายในเดือน', 'ติดต่อภายในไตรมาส'])

// --- MOCK CUSTOMER DATA ---
const customers = ref([
  {
    id: 1,
    branch: 'ลพบุรี',
    date: '14/08/2568',
    name: 'สมชาย ใจดี',
    phone: '0812345678',
    salesType: 'ขายสด',
    carModel: 'Wave 110',
  },
  {
    id: 2,
    branch: 'ลพบุรี',
    date: '14/08/2568',
    name: 'สมศรี มีสุข',
    phone: '0823456789',
    salesType: 'ขายผ่อน',
    carModel: 'Scoopy i',
  },
  {
    id: 3,
    branch: 'ลพบุรี',
    date: '13/08/2568',
    name: 'มานะ อดทน',
    phone: '0834567890',
    salesType: 'ขายไฟแนนซ์',
    carModel: 'Forza',
  },
  {
    id: 4,
    branch: 'ลพบุรี',
    date: '13/08/2568',
    name: 'ปิติ ยินดี',
    phone: '0845678901',
    salesType: 'ขายสด',
    carModel: 'Click 160',
  },
  {
    id: 5,
    branch: 'ลพบุรี',
    date: '12/08/2568',
    name: 'สุดา มาไว',
    phone: '0856789012',
    salesType: 'ขายผ่อน',
    carModel: 'Giorno',
  },
  {
    id: 6,
    branch: 'ลพบุรี',
    date: '12/08/2568',
    name: 'วีระ กล้าหาญ',
    phone: '0867890123',
    salesType: 'ขายสด',
    carModel: 'ADV160',
  },
  {
    id: 7,
    branch: 'สระบุรี',
    date: '11/08/2568',
    name: 'ชูใจ ใฝ่รู้',
    phone: '0878901234',
    salesType: 'ขายไฟแนนซ์',
    carModel: 'Wave 125',
  },
  {
    id: 8,
    branch: 'สระบุรี',
    date: '11/08/2568',
    name: 'อำนาจ เจริญ',
    phone: '0889012345',
    salesType: 'ขายสด',
    carModel: 'Lead',
  },
  {
    id: 9,
    branch: 'ลพบุรี',
    date: '10/08/2568',
    name: 'พรทิพย์ งามตา',
    phone: '0890123456',
    salesType: 'ขายผ่อน',
    carModel: 'Click 125',
  },
  {
    id: 10,
    branch: 'ลพบุรี',
    date: '10/08/2568',
    name: 'ทวีทรัพย์ มั่งมี',
    phone: '0901234567',
    salesType: 'ขายไฟแนนซ์',
    carModel: 'ADV350',
  },
  {
    id: 11,
    branch: 'สระบุรี',
    date: '09/08/2568',
    name: 'บุญมา รักไทย',
    phone: '0912345678',
    salesType: 'ขายสด',
    carModel: 'Scoopy i',
  },
  {
    id: 12,
    branch: 'ลพบุรี',
    date: '09/08/2568',
    name: 'วารี สีใส',
    phone: '0923456789',
    salesType: 'ขายผ่อน',
    carModel: 'Forza',
  },
  {
    id: 13,
    branch: 'สระบุรี',
    date: '08/08/2568',
    name: 'เอกราช ชนะภัย',
    phone: '0934567890',
    salesType: 'ขายสด',
    carModel: 'NMAX',
  },
  {
    id: 14,
    branch: 'ลพบุรี',
    date: '08/08/2568',
    name: 'จันทรา ส่องแสง',
    phone: '0945678901',
    salesType: 'ขายไฟแนนซ์',
    carModel: 'XSR155',
  },
  {
    id: 15,
    branch: 'สระบุรี',
    date: '07/08/2568',
    name: 'พิชัย ดาบหัก',
    phone: '0956789012',
    salesType: 'ขายผ่อน',
    carModel: 'MT-15',
  },
])

// --- COMPUTED PROPERTIES FOR LOGIC ---
const isFollowUpFormDisabled = computed(() => {
  return followUp.callStatus !== 'ลูกค้าสะดวกคุย'
})

const isSaveButtonDisabled = computed(() => {
  if (!selectedCustomer.value) {
    return true // Always disable if no customer is selected
  }
  if (followUp.callStatus === 'ลูกค้าไม่สะดวกคุย') {
    return !followUp.notes.trim() // Enable only if notes are filled
  }
  return false // Enable for all other cases
})

const filteredCustomers = computed(() => {
  return customers.value.filter((customer) => {
    const nameMatch = customer.name.toLowerCase().includes(search.name.trim().toLowerCase())
    const phoneMatch = customer.phone.includes(search.phone.trim())
    return nameMatch && phoneMatch
  })
})

// --- METHODS ---
const resetFollowUpForm = () => {
  Object.assign(followUp, {
    callStatus: 'ลูกค้าสะดวกคุย',
    appointmentDate: '',
    timeSlot: 'ช่วงเช้า',
    appointmentStatus: '',
    customerStatus: 'ผ่าน',
    salesType: 'ขายสด',
    furtherFollowUp: '',
    notes: '',
  })
}

const selectCustomer = (customer) => {
  selectedCustomer.value = customer
  resetFollowUpForm()
}

const handleFollowUpSubmit = () => {
  if (!isSaveButtonDisabled.value) {
    showConfirmModal.value = true
  }
}

const confirmFollowUpSubmission = () => {
  const followUpData = {
    customerId: selectedCustomer.value.id,
    customerName: selectedCustomer.value.name,
    ...followUp,
    submissionDate: new Date().toISOString(),
  }
  console.log('--- Follow-up Saved ---')
  console.log(JSON.stringify(followUpData, null, 2))

  showConfirmModal.value = false
  showSuccessMessage.value = true

  setTimeout(() => {
    showSuccessMessage.value = false
  }, 3000)

  // Optionally reset form or clear selection after saving
  // resetFollowUpForm();
  // selectedCustomer.value = null;
}

const cancelFollowUpSubmission = () => {
  showConfirmModal.value = false
}

// --- WATCHERS ---
watch(
  () => followUp.callStatus,
  () => {
    // Reset dependent fields if call status changes to a non-interactive one
    if (followUp.callStatus !== 'ลูกค้าสะดวกคุย') {
      followUp.appointmentDate = ''
      followUp.appointmentStatus = ''
    }
  },
)

watch(
  () => followUp.appointmentDate,
  (newDate) => {
    // Reset appointment status if date is cleared
    if (!newDate) {
      followUp.appointmentStatus = ''
    }
  },
)

watch(
  () => followUp.appointmentStatus,
  () => {
    // Reset sub-sections when appointment status changes
    followUp.customerStatus = 'ผ่าน'
    followUp.salesType = 'ขายสด'
    followUp.furtherFollowUp = ''
  },
)
</script>

<style scoped>
/* General Page Styles */
.page-container {
  font-family: 'Sarabun', sans-serif;
  background: linear-gradient(to bottom, #0b0b2b, #1b2735 70%, #090a0f);
  min-height: 100vh;
  padding: 1.5rem;
}

.main-content {
  width: 100%;
  max-width: 80rem; /* 1280px */
  margin: 0 auto;
}

/* Card Styles */
.card {
  background-color: #ffffff;
  border-radius: 0.75rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
}
.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.75rem;
}
.selected-customer-name {
  color: #1d4ed8;
  font-weight: 500;
}

/* Layout Grids */
.top-section-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}
@media (min-width: 1024px) {
  .top-section-grid {
    grid-template-columns: 1fr 2.5fr;
  }
}

.follow-up-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.follow-up-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem 1.5rem;
}

/* NEW: Styling for the appointment scheduling section */
.appointment-scheduling-section {
  background-color: #f9fafb;
  padding: 1.25rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

/* Disabled Fieldset */
.appointment-scheduling-section:disabled {
  opacity: 0.5;
  pointer-events: none;
}

/* Conditional Sections */
.conditional-section {
  border-top: 1px solid #f3f4f6;
  padding-top: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.sub-section {
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

/* Form Elements */
.form-group {
  margin-bottom: 0;
}
.form-group.full-span {
  grid-column: 1 / -1;
}
.form-group.search-group-spacing {
  margin-top: 1rem;
}
.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}
.form-input,
.form-textarea {
  width: 100%;
  padding: 0.5rem 0.75rem;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  box-sizing: border-box;
}
.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px #bfdbfe;
}
.highlight-notes .form-textarea {
  border-color: #fbbf24;
  box-shadow: 0 0 0 2px #fde68a;
}

/* Radio Buttons */
.radio-group-grid-followup {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem 1rem;
}
@media (min-width: 768px) {
  .radio-group-grid-followup {
    grid-template-columns: repeat(3, 1fr);
  }
}
.radio-group-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
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
  width: 1.15rem;
  height: 1.15rem;
  border: 2px solid #d1d5db;
  transition: all 0.2s;
  cursor: pointer;
  position: relative;
  top: -1px;
}
.form-radio-custom:checked {
  background-color: #3b82f6;
  border-color: #3b82f6;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
}

/* Submit Button */
.submit-container {
  margin-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
  padding-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
}
.submit-button {
  color: white;
  font-weight: 600;
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  background-color: #16a34a;
  transition: background-color 0.3s;
  cursor: pointer;
}
.submit-button:hover:not(:disabled) {
  background-color: #15803d;
}
.submit-button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

/* Data Table */
.data-table-card {
  overflow-x: auto;
}
.table-container {
  max-height: 400px; /* 10 rows approx */
  overflow-y: auto;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}
.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
.data-table th,
.data-table td {
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  border-bottom: 1px solid #e5e7eb;
}
.data-table th {
  background-color: #f9fafb;
  font-weight: 600;
  color: #374151;
  position: sticky;
  top: 0;
  z-index: 10;
}
.data-table tbody tr {
  transition: background-color 0.2s;
  cursor: pointer;
}
.data-table tbody tr:hover {
  background-color: #eff6ff;
}
.data-table tbody tr:last-child td {
  border-bottom: none;
}
.data-table .no-data {
  text-align: center;
  color: #6b7280;
  padding: 2rem;
}
.data-table .selected-row {
  background-color: #dbeafe;
  font-weight: 500;
}
.data-table .selected-row:hover {
  background-color: #bfdbfe;
}

/* Modal & Success Message Styles */
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
  font-family: 'Sarabun', sans-serif;
  font-weight: 500;
}
.modal-button.cancel {
  background-color: #e5e7eb;
  color: #1f2937;
}
.modal-button.cancel:hover {
  background-color: #d1d5db;
}
.modal-button.confirm {
  background-color: #16a34a;
  color: white;
}
.modal-button.confirm:hover {
  background-color: #15803d;
}

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
