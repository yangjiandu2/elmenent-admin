<template>
    <div>
        <cardDragger 
        :data="cardList"
        :colNum="4"
        :cardOutsideWidth="300"
        :cardInsideWidth="260"
        :cardOutsideHeight="310"
        :cardInsideHeight="240"
        />
        <!-- 上面的属性都可自定义 -->
    </div>
</template>

<script>
import { cardDragger } from 'carddragger'
export default {
    name:'dragger',
    data(){
        return{
            cardList: [
                {
                    positionNum: 1,
                    name: "测试卡片2",
                    id: "card2",
                },
                {
                    positionNum: 2,
                    name: "测试卡片2234",
                    id: "card3",
                },
                {
                    positionNum: 3,
                    name: "测试卡片324",
                    id: "card4",
                },
                {
                    positionNum: 4,
                    name: "测试卡片223432",
                    id: "card255",
                },
            ]
        }
    },
    components:{cardDragger,}
}
</script>