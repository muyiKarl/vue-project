<template>
    <div class="main-container">
        <div class="sidebar-list">
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                :collapse="collapse"
                :style="{width:collapse?'':'200px'}">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>导航一</span>
                    </template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                    <i class="el-icon-document"></i>
                    <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="sidebar-right">
            <div class="sidebar-head">
                <div class="user-info">
                    <el-badge :value="12" class="message">
                        <i class="el-icon-bell"></i>
                    </el-badge>
                    <el-dropdown trigger="click" class="user">
                        <span class="el-dropdown-link">
                            开发者开发者开发者开发者
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>个人信息</el-dropdown-item>
                            <el-dropdown-item>退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <div class="sidebar-body">
                <app-main/>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { AppMain } from './components'

export default {
    name: 'TopBar',
    components: {
        AppMain,
    },
    computed: {
        ...mapGetters([
            'permission_routes'
        ]),
    },
    data() {
        return{
            collapse: false
        }
    },
    created() {
        // eslint-disable-next-line no-console
        console.log(this.permission_routes)
    },
    methods: {
    }
}
</script>
<style scoped lang="scss">
    .main-container{
        display: flex;
        height: 100%;
        .sidebar-list{
            flex-shrink: 0;
            ul.el-menu{
                height: 100%;
            }
        }
        .sidebar-right{
            width: 100%;
            display: flex;
            flex-direction: column;
            .sidebar-head{
                height: 60px;
                display: flex;
                justify-content: flex-end;
                align-items: stretch;
                border-bottom: 1px solid #efefef;
                box-shadow: 0px 0px 3px #fefefe;
                flex-shrink: 0;
                .user-info{
                    width: 150px;
                    padding-right: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    .message{
                        cursor: pointer;
                    }
                    .user{
                        cursor: pointer;
                        /deep/ .el-dropdown-link{
                            display: inline-block;
                            width: 60px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }
            }
            .sidebar-body{
                height: 100%;
                overflow: auto;
            }
        }
    }
</style>