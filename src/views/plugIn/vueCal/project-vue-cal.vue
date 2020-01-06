<template>
    <div class="vue-cal-box">
        <div class="plug-in"><a href="https://antoniandre.github.io/vue-cal/" target="_blank">vue-cal</a></div>
        <div class="course-operation">
            <div class="basic-information">
                <span>vue-cal</span>
            </div>
            <div class="week-btns">
                <div class="now-week" :style="{ visibility: callBackNowWeek ? 'hidden' : 'visible' }" @click="nowWeek">
                    <span>回到本周</span>
                </div>
                <div class="week-info">
                    <div class="prev-week week-change-btn" @click="prevWeek">
                        <span>
                            <svg class="icon iconfont-size-20" aria-hidden="true">
                                <use xlink:href="#iconicon-left-arrow"></use>
                            </svg>
                            上一周
                        </span>
                    </div>
                    <div class="now-time">
                        <span>{{ courseInfo.year }}</span>
                        <span>{{ courseInfo.startWeek }}-{{ courseInfo.endWeek }}</span>
                    </div>
                    <div class="next-week week-change-btn" @click="nextWeek">
                        <span>
                            下一周
                            <svg class="icon iconfont-size-20" aria-hidden="true">
                                <use xlink:href="#iconicon-right-arrow"></use>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
            <div class="download-btn" @click="downloadCurriculum">
                <svg class="icon iconfont-size-30" aria-hidden="true">
                    <use xlink:href="#iconicon-download"></use>
                </svg>
                下载
            </div>
        </div>
        <div class="week-head">
            <div class="week-blank"></div>
            <div class="week-list">
                <div v-for="(day, index) in weekCells" :key="index" :class="[day.today ? 'today' : '', day.nowDay ? 'no-before' : 'before', 'week-item']" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
                    <div v-if="day.today" class="today-icon">
                        <svg class="icon iconfont-size-30" aria-hidden="true">
                            <use xlink:href="#iconicon-today"></use>
                        </svg>
                    </div>
                    <span class="week-name">{{ day.name }}</span>
                    <span class="week-time">{{ day.time }}</span>
                    <transition name="el-zoom-in-top">
                        <div v-show="addFlag" class="add-class" @click="addClassBtn(day)">
                            <span class="add-class-icon">
                                <svg class="icon iconfont-size-20" aria-hidden="true">
                                    <use xlink:href="#iconicon-add"></use>
                                </svg>
                            </span>
                            <span class="add-class-name">添加</span>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
        <vue-cal ref="vuecal" locale="zh-cn" :selected-date="selectedDate" :time-from="8 * 60" :time-to="47 * 30" :time-step="30" default-view="week" :disable-views="['years', 'year', 'month', 'day']" :events="events" hideViewSelector hideTitleBar :timeCellHeight="80">
            <template slot="event-renderer" slot-scope="{ event }">
                <div :class="{ 'course-cal-event': true, 'time-tip': timePeriodFlag }" @mousemove="timePeriodMouseMove($event, event)" @mouseleave="timePeriodMouseLeave" @click="eventClick(event)">
                    <div class="content-img">
                        <span v-if="!event.hasWork">
                            <svg class="icon iconfont-size-20" aria-hidden="true">
                                <use xlink:href="#iconicon-content-not"></use>
                            </svg>
                        </span>
                        <span v-else>
                            <svg class="icon iconfont-size-20" aria-hidden="true">
                                <use xlink:href="#iconicon-content-has"></use>
                            </svg>
                        </span>
                    </div>
                    <!-- <div v-if="classInfo.id" class="cal-event-title" v-html="event.name" /> -->
                    <div class="cal-event-title" v-html="event.name" />

                    <div v-if="event.hasWork" class="release-img">
                        <span v-if="event.status">
                            <svg class="icon iconfont-size-20" aria-hidden="true">
                                <use xlink:href="#iconicon-release-has"></use>
                            </svg>
                        </span>
                        <span v-else>
                            <svg class="icon iconfont-size-20" aria-hidden="true">
                                <use xlink:href="#iconicon-release-not"></use>
                            </svg>
                        </span>
                    </div>
                    <div :class="[!event.status && event.hasWork ? 'has-delete-img' : '', 'delete-img']" @click.stop="eventDelClick(event)">
                        <div>
                            <svg class="icon iconfont-size-20" aria-hidden="true">
                                <use xlink:href="#iconicon-delete"></use>
                            </svg>
                        </div>
                    </div>
                </div>
            </template>
            <template slot="cell-content" slot-scope="{ cell, view, events }">
                <span class="vuecal__no-event" v-if="['week', 'day'].includes(view.id) && !events.length"></span>
            </template>
        </vue-cal>
        <div class="time-period" :style="{
                top: eventTime.eventTimeY + 'px',
                left: eventTime.eventTimeX + 'px'
            }">
            {{ eventTime.eventStartTime }}~{{ eventTime.eventEndTime }}
        </div>
    </div>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/i18n/zh-cn.js';
import 'vue-cal/dist/vuecal.css';
import { parseTime } from '@/utils';

export default {
    name: 'home',
    components: {
        VueCal
    },
    data() {
        return {
            timePeriodFlag: false,
            addFlag: false,
            weekCells: [],
            callBackNowWeek: true,
            courseInfo: {
                year: '',
                startWeek: '',
                endWeek: ''
            },
            selectedDate: new Date(),
            events: [],
            eventTime: {
                eventTimeY: '-100',
                eventTimeX: '-100',
                eventStartTime: '00.00',
                eventEndTime: '00.00'
            }
        };
    },
    mounted() {
        this.getWeekInfo();
    },
    methods: {
        getCourseSchudleList(arr) {
            this.events = [
                {
                    id: 1,
                    classId: 1,
                    className: 'className',
                    start: arr[0].year + '-' + arr[0].time.replace('.', '-') + ' 8:00',
                    end: arr[0].year + '-' + arr[0].time.replace('.', '-') + ' 8:30',
                    name: arr[0].year,
                    status: true, // 发布状态 状态：0-未发布，1-已发布
                    isAfter: true, // 是否过期 状态：0否，1是
                    hasWork: true, // 是否备过课 状态：0否，1是
                    class: ''
                },
                {
                    id: 6,
                    classId: 1,
                    className: 'className',
                    start: arr[5].year + '-' + arr[5].time.replace('.', '-') + ' 9:00',
                    end: arr[5].year + '-' + arr[5].time.replace('.', '-') + ' 9:30',
                    name: arr[5].year,
                    status: false,
                    isAfter: false,
                    hasWork: true,
                    class: ''
                }
            ]
        },
        /**
         * 获取日历的标题、头部
         */
        getWeekInfo() {
            this.weekCells = [];
            let viewCells = this.$refs.vuecal.viewCells;
            let len = viewCells.length;
            let nowDayFlag = false;
            this.courseInfo.year = parseTime(viewCells[0].formattedDate, '{y}');
            this.courseInfo.startWeek = parseTime(viewCells[0].formattedDate, '{m}.{d}');
            this.courseInfo.endWeek = parseTime(viewCells[viewCells.length - 1].formattedDate, '{m}.{d}');
            for (let i = 0; i < len; i++) {
                let name = '周' + parseTime(viewCells[i].formattedDate, '{a}');
                let year = parseTime(viewCells[i].formattedDate, '{y}');
                let time = parseTime(viewCells[i].formattedDate, '{m}.{d}');
                let day = viewCells[i].formattedDate;
                if (this.timeBefor(day)) {
                    nowDayFlag = true;
                }
                let str = {
                    name: name,
                    year: year,
                    time: time,
                    today: viewCells[i].today,
                    nowDay: nowDayFlag
                };
                this.weekCells.push(str);
            }
            if (new Date(this.weekCells[0].year + '/' + this.weekCells[0].time.replace('.', '/')).getTime() > new Date().getTime() || new Date(this.weekCells[6].year + '/' + this.weekCells[6].time.replace('.', '/')) < new Date().getTime()) {
                this.callBackNowWeek = false;
            } else {
                this.callBackNowWeek = true;
            }
            this.getCourseSchudleList(this.weekCells);
        },
        /**
         * 判断是否是今天以前的时间
         * day 需要判断的时间
         */
        timeBefor(day) {
            let nowDay = new Date(parseTime(new Date(), '{y}/{m}/{d}')).getTime();
            day = new Date(parseTime(day, '{y}/{m}/{d}')).getTime();
            return nowDay <= day;
        },
        /**
         * 回到本周
         */
        nowWeek() {
            this.$refs.vuecal.switchView('week');
            this.getWeekInfo();
        },
        /**
         * 上一周
         */
        prevWeek() {
            this.$refs.vuecal.previous();
            this.getWeekInfo();
        },
        /**
         * 下一周
         */
        nextWeek() {
            this.$refs.vuecal.next();
            this.getWeekInfo();
        },
        /**
         * 鼠标移入事件
         * 日历头部的添加按钮
         */
        mouseEnter() {
            this.addFlag = !this.addFlag;
        },
        /**
         * 鼠标移出事件
         * 日历头部的添加按钮
         */
        mouseLeave() {
            this.addFlag = !this.addFlag;
        },
        /**
         * 鼠标移入事件
         * 课程上的时间显示
         */
        timePeriodMouseMove(e, item) {
            let weekName = parseTime(item.start, '{a}');
            this.eventTime.eventStartTime = parseTime(item.start, '{h}.{i}');
            this.eventTime.eventEndTime = parseTime(item.end, '{h}.{i}');
            this.eventTime.eventTimeY = e.clientY;
            // 如果是周日显示在鼠标左边  其他显示在鼠标右边
            if (weekName === '日') {
                this.eventTime.eventTimeX = e.clientX - 95;
                return;
            }
            this.eventTime.eventTimeX = e.clientX + 21;
        },
        /**
         * 鼠标移出事件
         * event上的时间消失
         */
        timePeriodMouseLeave() {
            this.eventTime.eventTimeY = '-100';
            this.eventTime.eventTimeX = '-100';
        },
        /**
         * 下载
         */
        downloadCurriculum() {
            this.$message('下载');
        },
        /**
         * 添加事件
         */
        addClassBtn() {
            this.$message('添加');
        },
        /**
         * 日历上的事件点击
         */
        eventClick() {
            this.$message('事件点击');
        },
        /**
         * 删除事件
         */
        eventDelClick() {
            this.$message('删除');
        }
    }
}
</script>
<style lang="scss" scoped>
.vue-cal-box{
    height: 100%;
    background-color: #f7f7f7;
    /deep/.vuecal {
        box-shadow: 0px 0px 0px;
    }
    /deep/.vuecal__now-line {
        display: none;
    }
    /deep/.vuecal--week-view {
        .vuecal__header {
            display: none;
        }
        .vuecal__body {
            .vuecal__flex {
                overflow: hidden;
                .vuecal__cells {
                    margin: 0;
                }
            }
            .vuecal__cell.today {
                background-color: rgba(204, 203, 210, 0.3);
                .vuecal__event {
                    background-color: rgba(204, 203, 210, 0.3);
                }
            }
            .vuecal__cell.selected:not(.today) {
                background-color: rgba(0, 0, 0, 0);
            }
            .vuecal__cell {
                .vuecal__event {
                    margin: 0 5%;
                    width: 90% !important;
                    background-color: #fff !important;
                    border-radius: 4px;
                    cursor: pointer;
                    &:hover {
                        -moz-box-shadow: 0 2px 4px 0 #888888; /* 老的 Firefox */
                        box-shadow: 0 2px 4px 0 #888888;
                    }
                }
                .course-cal-event {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    font-size: 14px;
                    color: #222;
                    .content-img {
                        width: 28px;
                        height: 26px;
                        transform: scale(0.7);
                        flex-shrink: 0;
                        .icon {
                            font-size: 24px;
                        }
                    }
                    .release-img {
                        position: absolute;
                        width: 40px;
                        height: 40px;
                        right: 0;
                        top: 0;
                        .icon {
                            font-size: 40px;
                        }
                    }
                    .delete-img {
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        display: none;
                        .icon {
                            font-size: 15px;
                        }
                    }
                    .has-delete-img {
                        display: block;
                        border-top: 14px solid white;
                        border-right: 14px solid red;
                        border-bottom: 14px solid red;
                        border-left: 14px solid white;
                        opacity: 0.8;
                        div {
                            width: 14px;
                            height: 13px;
                            position: absolute;
                            z-index: 5;
                        }
                    }
                    .cal-event-title {
                        width: 60%;
                        flex-wrap: wrap;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                        text-align: left;
                    }
                }
            }
        }
    }
    .course-operation {
        div {
            display: flex;
        }
        display: flex;
        justify-content: space-between;
        height: 80px;
        align-items: center;
        .basic-information {
            flex-direction: column;
            justify-content: space-around;
            span {
                &:first-child {
                    color: #222222;
                    font-size: 18px;
                    font-weight: bold;
                }
                &:last-child {
                    color: #666666;
                    font-size: 14px;
                    margin-top: 10px;
                }
            }
        }
        .week-btns {
            height: 60px;
            justify-content: space-between;
            align-items: stretch;
            .now-week {
                height: 100%;
                font-size: 14px;
                color: #666666;
                margin-right: 30px;
                align-items: center;
                cursor: pointer;
            }
            .week-info {
                border: 1px solid #eeeeee;
                border-radius: 100px;
                justify-content: space-between;
                align-items: stretch;
                .week-change-btn {
                    width: 80px;
                    background-color: #fff;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    span {
                        display: flex;
                    }
                }
                .prev-week {
                    border-radius: 30px 0 0 30px;
                }
                .now-time {
                    width: 150px;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-evenly;
                    span {
                        display: block;
                        &:first-child {
                            color: #222;
                            font-size: 30px;
                            font-weight: bold;
                            font-family: D-DIN;
                        }
                        &:last-child {
                            color: #999;
                            font-size: 14px;
                        }
                    }
                }
                .next-week {
                    border-radius: 0 30px 30px 0;
                }
            }
        }

        .download-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #3b3e55;
            border-radius: 4px;
            padding: 0 16px;
            height: 34px;
            line-height: 34px;
            color: #fff;
            font-size: 14px;
            cursor: pointer;
        }
    }
    .week-head {
        width: 100%;
        height: 60px;
        border-top: 1px solid #e2e2e2;
        display: flex;
        flex: 1 1 auto;
        .week-blank {
            width: 3em;
            height: 100%;
            flex-shrink: 0;
        }
        .week-list {
            width: 100%;
            display: flex;
            flex: 1 1 auto;
            flex-wrap: wrap;
            .week-item {
                width: 14.2857%;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
                .week-name {
                    color: #222;
                    font-size: 18px;
                    font-weight: bold;
                }
                .week-time {
                    display: block;
                    color: #999;
                    font-size: 14px;
                }
            }
            .today {
                background-color: rgba(204, 203, 210, 0.3);
                position: relative;
                .today-icon {
                    position: absolute;
                    top: 0;
                    left: 10px;
                    font-size: 10px;
                    color: #fff;
                    transform: scale(1);
                    border-radius: 0 0 4px 4px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
            .add-class {
                display: none;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: 0;
                left: 0;
                background-color: #000;
                z-index: 2;
                width: 100%;
                height: 100%;
                opacity: 0.8;
                .add-class-icon {
                    .icon {
                        color: #fff;
                        font-size: 27px;
                    }
                }
                .add-class-name {
                    color: #fff;
                    font-size: 14px;
                }
            }
            .no-before {
                position: relative;
                box-sizing: border-box;
                cursor: pointer;
                &:hover {
                    .add-class {
                        display: flex;
                    }
                }
            }
        }
    }
    .time-period {
        padding: 5px 8px;
        font-size: 12px;
        background-color: #000;
        color: #fff;
        border-radius: 2px;
        position: fixed;
        z-index: 10;
    }
}
</style>