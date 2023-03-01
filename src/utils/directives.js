// import router from '@/router/index'
import useNavTabs from '@/store/modeules/router.js'



export function directives(app) {
    // 鉴权指令
    authDirective(app)
    // 拖动指令
    dragDirective(app)
}

/**
 * 页面按钮鉴权指令
 * @description v-auth="'name'"，name可以为：index,add,edit,del,...
 */
function authDirective(app) {
    app.directive('auth', {
        mounted(el, binding) {
            if (!binding.value) return false
            const navTabs = useNavTabs()
            console.log("@/stores/modeules/router", navTabs)
            if (navTabs.state.authNode.has(useNavTabs.currentRoute.value.path)) {
                // if (
                //     !navTabs.state.authNode
                //         .get(router.currentRoute.value.path)!
                //         .some((v: string) => v == router.currentRoute.value.path + '/' + binding.value)
                // ) {
                //     el.parentNode.removeChild(el)
                // }
            }
        },
    })
}



/**
 * 拖动指令
 * @description v-drag="[domEl,handleEl]"
 * @description domEl=被拖动的元素，handleEl=在此元素内可以拖动`dom`
 */
function dragDirective(app) {
    app.directive('drag', {
        mounted(el, binding) {
            if (!binding.value) return false
            const dragDom = document.querySelector(binding.value[0])
            const dragHandle = document.querySelector(binding.value[1])
            if (!dragHandle || !dragDom) {
                return false
            }
            dragHandle.onmouseover = () => (dragHandle.style.cursor = `move`)
            function down(e, type) {
                // 鼠标按下，计算当前元素距离可视区的距离
                const disX =
                    type === 'pc' ? (e).clientX - dragHandle.offsetLeft : (e).touches[0].clientX - dragHandle.offsetLeft
                const disY =
                    type === 'pc' ? (e).clientY - dragHandle.offsetTop : (e).touches[0].clientY - dragHandle.offsetTop

                // body宽度
                const screenWidth = document.body.clientWidth
                const screenHeight = document.body.clientHeight || document.documentElement.clientHeight

                // 被拖动元素宽度
                const dragDomWidth = dragDom.offsetWidth
                // 被拖动元素高度
                const dragDomheight = dragDom.offsetHeight
                // 拖动限位
                const minDragDomLeft = dragDom.offsetLeft
                const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth
                const minDragDomTop = dragDom.offsetTop
                const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight

                // 获取到的值带px 正则匹配替换
                let styL = getComputedStyle(dragDom).left
                let styT = getComputedStyle(dragDom).top
                styL = +styL.replace(/\px/g, '')
                styT = +styT.replace(/\px/g, '')

                return {
                    disX,
                    disY,
                    minDragDomLeft,
                    maxDragDomLeft,
                    minDragDomTop,
                    maxDragDomTop,
                    styL,
                    styT,
                }
            }

            function move(e, type, obj) {
                const { disX, disY, minDragDomLeft, maxDragDomLeft, minDragDomTop, maxDragDomTop, styL, styT } = obj

                // 通过事件委托，计算移动的距离
                let left = type === 'pc' ? (e).clientX - disX : (e).touches[0].clientX - disX
                let top = type === 'pc' ? (e).clientY - disY : (e).touches[0].clientY - disY

                // 边界处理
                if (-left > minDragDomLeft) {
                    left = -minDragDomLeft
                } else if (left > maxDragDomLeft) {
                    left = maxDragDomLeft
                }

                if (-top > minDragDomTop) {
                    top = -minDragDomTop
                } else if (top > maxDragDomTop) {
                    top = maxDragDomTop
                }

                // 移动当前元素
                dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
            }

            dragHandle.onmousedown = (e) => {
                const obj = down(e, 'pc')
                document.onmousemove = (e) => {
                    move(e, 'pc', obj)
                }
                document.onmouseup = () => {
                    document.onmousemove = null
                    document.onmouseup = null
                }
            }
            dragHandle.ontouchstart = (e) => {
                const obj = down(e, 'app')
                document.ontouchmove = (e) => {
                    move(e, 'app', obj)
                }
                document.ontouchend = () => {
                    document.ontouchmove = null
                    document.ontouchend = null
                }
            }
        },
    })
}
