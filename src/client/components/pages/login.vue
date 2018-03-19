<template>
    <div>
        <h1>ログイン</h1>
        <button class="btn btn-primary" v-on:click="login" v-bind:disabled="loading">
            <span v-if="!loading">imastodon.netでログインする</span>
            <span v-else>ロード中...</span>
        </button>
        <p>他のインスタンスでのログインは現在準備中です。</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import apiCall from '../../api-call'

export default Vue.extend({
    data: () => ({
        loading: false,
    }),
    methods: {
        login() {
            this.loading = true
            apiCall<string>("Login.GetUrl", {
                "instance": "imastodon.net"
            }).then(res => {
                location.href = res
            }).catch(e => {
                this.loading = false
                console.error(e)
            })
        }
    }
})
</script>
