<template>
  <admin-layout>
    <!-- Toast de sucesso pós-login, flutuante no canto superior direito -->
    <div
      v-if="showLoginSuccess"
      class="fixed right-6 top-24 z-50"
    >
      <Alert
        variant="success"
        title="Login realizado com sucesso"
        message="Você foi autenticado com sucesso."
      />
    </div>

    <div class="grid grid-cols-12 gap-4 md:gap-6">
      <div class="col-span-12 space-y-6 xl:col-span-7">
        <ecommerce-metrics />
        <monthly-target />
      </div>
      <div class="col-span-12 xl:col-span-5">
        <monthly-sale />
      </div>

      <div class="col-span-12">
        <statistics-chart />
      </div>

      <div class="col-span-12 xl:col-span-5">
        <customer-demographic />
      </div>

      <div class="col-span-12 xl:col-span-7">
        <recent-orders />
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import AdminLayout from '../components/layout/AdminLayout.vue'
import EcommerceMetrics from '../components/ecommerce/EcommerceMetrics.vue'
import MonthlyTarget from '../components/ecommerce/MonthlySale.vue'
import MonthlySale from '../components/ecommerce/MonthlyTarget.vue'
import CustomerDemographic from '../components/ecommerce/CustomerDemographic.vue'
import StatisticsChart from '../components/ecommerce/StatisticsChart.vue'
import RecentOrders from '../components/ecommerce/RecentOrders.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Alert from '@/components/ui/Alert.vue'

const route = useRoute()
const router = useRouter()
const showLoginSuccess = ref(false)

onMounted(() => {
  if (route.query.login === 'success') {
    showLoginSuccess.value = true

    // Remove a query `login` para não reaparecer ao recarregar a página
    const { login, ...rest } = route.query
    router.replace({ path: route.path, query: rest })

    // Oculta o alerta automaticamente após alguns segundos
    setTimeout(() => {
      showLoginSuccess.value = false
    }, 4000)
  }
})
</script>
