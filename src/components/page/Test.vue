<template>
  <div class="container">
      <el-row :gutter="10">
        <el-col :md="4"><div class="grid-content bg-purple"></div></el-col>
        <el-col :md="8"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :md="8"><div class="grid-content bg-purple"></div></el-col>
        <el-col :md="4"><div class="grid-content bg-purple-light"></div></el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .container {
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
  }
  @media (min-width: 768px) {
    .container {
      width: 750px;
    }
  }
  @media (min-width: 992px) {
    .container {
      width: 970px;
    }
  }
  @media (min-width: 1200px) {
    .container {
      width: 1170px;
    }
  }
</style>