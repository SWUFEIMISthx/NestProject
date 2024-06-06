<template>
<view>
    <page-header>
        <view class="page-header flex v-center h-start">
            <view class="btn-back" @click="onPageBackTap">
                <u-icon name="arrow-left" color="#fff" size="24"></u-icon>
            </view>
            <view class="tabs flex v-center h-center">
                <view
                    class="tab"
                    v-for="tab in tabList"
                    :class="{ current: tab.key === tabCurrent }"
                    :key="tab.key"
                    @click="onTabChange(tab)">
                    {{ tab.name }}
                </view>
            </view>
        </view>
    </page-header>
    <view class="page-body" :style="{ height: `calc(100vh - ${pageHeaderHeight + 12}rpx)` }">
        <u-transition :show="tabCurrent === 'circle'" :duration="500" mode="slide-left">
            <view class="transition-body circle-list" :style="{ height: `calc(100vh - ${pageHeaderHeight + 12}rpx)` }">
                <u-button class="add-activity-btn" type="primary" @click="addActivity">新增活动</u-button>
                <view v-for="item in circleItems" :key="item.id" class="circle-item">
                    <view class="circle-header">
                        <text class="circle-title">{{ item.title }}</text>
                        <view @click="deleteItem(item.id)" class="delete-btn">删除</view>
                    </view>
                    <text>{{ item.content }}</text>
                    <view @click="commentItem(item.id)" class="comment-btn">
                        <u-icon name="chat" size="24"></u-icon>
                    </view>
                    <view v-if="comments[item.id]" class="comments">
                        <view v-for="comment in comments[item.id]" :key="comment.id" class="comment">
                            <text>{{ comment.content }}</text>
                        </view>
                    </view>
                </view>
                <u-loadmore :status="status" />
            </view>
        </u-transition>
        <u-transition :show="tabCurrent === 'album'" :duration="500" mode="slide-right">
            <view class="transition-body album-list flex flex-wrap h-s-b" :style="{ height: `calc(100vh - ${pageHeaderHeight + 12}rpx)` }">
                <view class="album-item" @click="createAlbum">
                    <view class="thumb flex v-center h-center">
                        <u-icon name="plus" size="48"></u-icon>
                    </view>
                    <view class="title">新建相册</view>
                </view>
                <view class="album-item" v-for="album in albums" :key="album.id" @click="openAlbum(album)">
                    <view class="thumb flex v-center h-center">
                        <image v-for="image in album.images.slice(0, 1)" :src="image" class="album-image" mode="aspectFill"></image>
                    </view>
                    <view class="title">{{ album.name }}</view>
                    <view class="count">{{ album.count }}</view>
                </view>
            </view>
        </u-transition>
    </view>
</view>
</template>

<script>
import PageHeader from '@/components/PageHeader/index.vue';
import CircleListItem from '@/components/CircleListItem/index.vue';

export default {
    components: { PageHeader, CircleListItem },
    data () {
        return {
            menuButtonInfo: {},
            pageHeaderHeight: 0,
            tabList: [
                { key: 'circle', name: '班级圈' },
                { key: 'album', name: '班级相册' },
            ],
            tabCurrent: 'circle',
            status: 'nomore',
            showCircle: false,
            showAlbum: false,
            circleItems: [],
            albums: [
                {
                    id: 1,
                    name: '班级照片',
                    count: 15,
                    images: [
                        "https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/%E7%95%99%E5%AE%88%E5%84%BF%E7%AB%A5%E7%85%A7%E7%89%87/1.jpg",
                        "https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/%E7%95%99%E5%AE%88%E5%84%BF%E7%85%A7%E7%89%87/10.jpg",
                        "https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/%E7%95%99%E5%AE%88%E5%84%BF%E7%85%A7%E7%89%87/12.jpg",
                        "https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/%E7%95%99%E5%AE%88%E5%84%BF%E7%85%A7%E7%89%87/2.jpg",
                        "https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/%E7%95%99%E5%AE%88%E5%84%BF%E7%85%A7%E7%89%87/5.jpg",
                        "https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/%E7%95%99%E5%AE%88%E5%84%BF%E7%85%A7%E7%89%87/11.jpg",
                        "https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/%E7%95%99%E5%AE%88%E5%84%BF%E7%85%A7%E7%89%87/13.jpg",
                        "https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/%E7%95%99%E5%AE%88%E5%84%BF%E7%85%A7%E7%89%87/14.jpg",
                        "https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/%E7%95%99%E5%AE%88%E5%84%BF%E7%85%A7%E7%89%87/15.jpg",
                        "https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/%E7%95%99%E5%AE%88%E5%84%BF%E7%85%A7%E7%89%87/3.jpg",
                        "https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/%E7%95%99%E5%AE%88%E5%84%BF%E7%85%A7%E7%89%87/4.jpg",
                        "https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/%E7%95%99%E5%AE%88%E5%84%BF%E7%85%A7%E7%89%87/6.jpg",
                        "https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/%E7%95%99%E5%AE%88%E5%84%BF%E7%85%A7%E7%89%87/7.jpg",
                        "https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/%E7%95%99%E5%AE%88%E5%84%BF%E7%85%A7%E7%89%87/8.jpg",
                        "https://images-special.oss-cn-chengdu.aliyuncs.com/CloudImages/%E7%95%99%E5%AE%88%E5%84%BF%E7%85%A7%E7%89%87/9.jpg"
                    ]
                },
            ],
            comments: {}
        }
    },
    methods: {
        onPageBackTap () {
            uni.navigateBack();
        },
        onTabChange ({ key, name }) {
            this.tabCurrent = key
        },
        openAlbum (album) {
            uni.navigateTo({
                url: `/pages/ImageDisplay/ImageDisplay?albumId=${album.id}`
            });
        },
        deleteItem (id) {
            this.circleItems = this.circleItems.filter(item => item.id !== id);
            uni.setStorageSync('circleItems', this.circleItems);  // Save updated list
        },
        commentItem (id) {
            uni.navigateTo({
                url: '/packageStudent/pages/CommentPage?itemId=' + id
            });
        },
        addActivity() {
            uni.navigateTo({
                url: `/packageStudent/pages/AddActivityPage`
            });
        },
        loadCircleItems () {
            const items = uni.getStorageSync('circleItems') || [
                { id: 1, title: '活动1', content: '这是第一个班级活动的内容' },
                { id: 2, title: '活动2', content: '这是第二个班级活动的内容' },
                { id: 3, title: '活动3', content: '这是第三个班级活动的内容' }
            ];
            this.circleItems = items;
        }
    },
    onShow() {
        const comments = uni.getStorageSync('comments') || [];
        this.comments = comments.reduce((acc, comment) => {
            if (!acc[comment.itemId]) {
                acc[comment.itemId] = [];
            }
            acc[comment.itemId].push(comment);
            return acc;
        }, {});
        this.loadCircleItems();
    }
}
</script>

<style scoped lang="scss">
page{
    background: #fff !important;
}

.page-header{
    .tabs{
        .tab{
            margin: 0 24rpx;
            color: #fff;
            font-size: 32rpx;
            &:after{
                position: absolute;
                bottom: -8rpx;
                left: 0;
                right: 0;
                margin: auto;
                display: block;
                content: '';
                width: 0;
                height: 8rpx;
                background: #fff;
                border-radius: 4rpx;
                transition: all ease .35s;
                opacity: 0;
            }
            &.current{
                font-weight: bolder;
                position: relative;
                &:after{
                    width: 80%;
                    opacity: 1;
                }
            }
        }
    }
}

.page-body{
    position: relative;
    .transition-body{
        width: 750rpx;
        height: 100%;
        overflow: auto;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: #fff;
    }
}
.circle-list{
    padding: 32rpx 24rpx 100rpx;
    .add-activity-btn {
        width: 100%;
        margin-bottom: 24rpx;
        background-color: #1A73E8;
    }
    .circle-item{
        padding: 16rpx;
        margin-bottom: 24rpx;
        border-bottom: 1px solid #eee;
        .circle-header{
            display: flex;
            justify-content: space-between;
            .circle-title{
                font-weight: bold;
                font-size: 36rpx;
            }
            .delete-btn{
                color: #1A73E8;
                cursor: pointer;
            }
        }
        .comment-btn{
            margin-top: 8rpx;
            display: flex;
            justify-content: flex-end;
            cursor: pointer;
        }
    }
    .comments{
        margin-top: 12rpx;
        .comment{
            margin-bottom: 8rpx;
            padding: 12rpx;
            background: #f5f5f5;
            border-radius: 8rpx;
        }
    }
}
.album-list{
    padding: 80rpx 24rpx 100rpx;
    .album-item{
        width: 339rpx;
        margin-bottom: 36rpx;
        .thumb{
            width: 339rpx;
            height: 339rpx;
            background: #eee;
            border-radius: 12rpx;
            overflow: hidden;
            margin-bottom: 16rpx;
            .album-image{
                width: 100%;
                height: 100%;
            }
        }
        .name{
            font-size: 32rpx;
            color: #1A1C2C;
        }
        .count{
            color: #767676;
        }
    }
}
</style>
