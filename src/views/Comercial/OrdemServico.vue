<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div class="p-6">
      <h1 class="mb-2 text-2xl font-semibold">Ordem de Serviço</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Tela em reestruturação. Em breve, cadastro e acompanhamento de O.S.
      </p>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AdminLayout from '@/components/layout/AdminLayout.vue';
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue';

const currentPageTitle = ref('Ordem de Serviço');
</script>
