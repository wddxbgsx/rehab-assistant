// 动作数据库 - 37个居家康复动作
export const exercises = {
  // ==================== 热身动作 (5个) ====================
  warmup: [
    {
      id: 'warmup_01',
      name: '原地踏步',
      category: 'warmup',
      duration: '2分钟',
      image: '/images/warmup/warmup_01.png',
      description: '双脚交替抬起，高度约15-20cm，配合手臂自然前后摆动',
      tips: [
        '保持节奏均匀，呼吸自然',
        '膝盖尽量抬高，但不要勉强',
        '手臂配合摆动，保持身体协调',
        '全程保持上身直立'
      ]
    },
    {
      id: 'warmup_02',
      name: '髋关节环绕',
      category: 'warmup',
      reps: '顺时针10圈 + 逆时针10圈',
      image: '/images/warmup/warmup_02.png',
      description: '双手叉腰，单腿站立，另一腿抬起做圆周运动',
      tips: [
        '动作缓慢控制，不要借力',
        '幅度逐渐增大',
        '保持身体稳定，可扶墙辅助',
        '感受髋关节的活动'
      ]
    },
    {
      id: 'warmup_03',
      name: '猫牛式',
      category: 'warmup',
      reps: '10次',
      image: '/images/warmup/warmup_03.png',
      description: '四点跪姿，吸气时塌腰抬头（牛式），呼气时拱背低头（猫式）',
      tips: [
        '动作配合呼吸，不要憋气',
        '吸气时腹部下沉，呼气时收紧',
        '动作要缓慢流畅',
        '感受脊柱逐节活动'
      ]
    },
    {
      id: 'warmup_04',
      name: '手臂环绕',
      category: 'warmup',
      reps: '向前10圈 + 向后10圈',
      image: '/images/warmup/warmup_04.png',
      description: '双臂侧平举，做小幅度圆周环绕，逐渐增大画圈幅度',
      tips: [
        '保持手臂伸直',
        '肩膀下沉，不要耸肩',
        '动作要匀速',
        '感受肩关节的活动'
      ]
    },
    {
      id: 'warmup_05',
      name: '高抬腿原地走',
      category: 'warmup',
      duration: '60秒',
      image: '/images/warmup/warmup_05.png',
      description: '原地行走，膝盖尽量抬高至腰部，手臂配合摆动',
      tips: [
        '保持上身直立，不要前倾',
        '膝盖尽量抬高但要舒适',
        '保持呼吸均匀',
        '如感到不适可降低抬腿高度'
      ]
    }
  ],

  // ==================== 拉伸动作 (12个) ====================
  stretch: [
    {
      id: 'stretch_01',
      name: '股四头肌拉伸',
      category: 'stretch',
      duration: '每侧30秒',
      image: '/images/stretch/stretch_01.png',
      description: '站立，单手扶墙保持平衡，同侧手抓住脚踝向臀部拉',
      tips: [
        '保持骨盆中立，不要前倾',
        '膝盖指向地面，不要外翻',
        '感到大腿前侧拉伸感即可',
        '如够不到脚踝可用毛巾辅助'
      ]
    },
    {
      id: 'stretch_02',
      name: '腘绳肌拉伸',
      category: 'stretch',
      duration: '每侧30秒',
      image: '/images/stretch/stretch_02.png',
      description: '坐姿，一腿伸直，另一腿弯曲脚底贴大腿内侧，身体从髋部前倾',
      tips: [
        '从髋部折叠，保持背部挺直',
        '不要弓背或低头',
        '感到大腿后侧拉伸即可',
        '双手尽量够脚尖，够不到也没关系'
      ]
    },
    {
      id: 'stretch_03',
      name: '小腿拉伸',
      category: 'stretch',
      duration: '每侧30秒×2',
      image: '/images/stretch/stretch_03.png',
      description: '面墙站立，前脚掌抵墙，脚跟踩地，身体前倾',
      tips: [
        '第一个姿势拉伸小腿上部',
        '弯曲膝盖可拉伸小腿下部',
        '保持脚跟踩地',
        '感到小腿后侧拉伸即可'
      ]
    },
    {
      id: 'stretch_04',
      name: '臀部拉伸（仰卧）',
      category: 'stretch',
      duration: '每侧30秒',
      image: '/images/stretch/stretch_04.png',
      description: '仰卧，将一侧脚踝放在另一侧膝盖上，双手抱住下方大腿向胸口拉',
      tips: [
        '保持头部和肩膀放松',
        '感到臀部深层拉伸',
        '可轻轻晃动放松',
        '如拉不到大腿可用毛巾辅助'
      ]
    },
    {
      id: 'stretch_05',
      name: '婴儿式',
      category: 'stretch',
      duration: '30-60秒',
      image: '/images/stretch/stretch_05.png',
      description: '跪姿，臀部坐脚跟，双臂向前伸展，额头贴地',
      tips: [
        '放松全身，深呼吸',
        '感到背部和肩部拉伸',
        '膝盖可分开让腹部放松',
        '如膝盖不适可在膝下垫毛巾'
      ]
    },
    {
      id: 'stretch_06',
      name: '膝盖抱胸拉伸',
      category: 'stretch',
      duration: '每侧30秒',
      image: '/images/stretch/stretch_06.png',
      description: '仰卧，双手抱住一侧膝盖拉向胸口，另一腿伸直或弯曲踩地',
      tips: [
        '保持头部和肩膀放松',
        '感到下背部拉伸',
        '保持自然呼吸',
        '另一腿可弯曲踩地增加稳定'
      ]
    },
    {
      id: 'stretch_07',
      name: '坐姿脊柱扭转',
      category: 'stretch',
      duration: '每侧30秒',
      image: '/images/stretch/stretch_07.png',
      description: '坐姿，一腿伸直，另一腿弯曲跨过，对侧手肘抵住膝盖外侧，转头看后方',
      tips: [
        '从腰部开始扭转，不只是转头',
        '保持坐骨稳定',
        '呼吸要深长',
        '如有腰痛减轻扭转幅度'
      ]
    },
    {
      id: 'stretch_08',
      name: '胸部拉伸',
      category: 'stretch',
      duration: '每侧30秒',
      image: '/images/stretch/stretch_08.png',
      description: '站在门框旁，手臂呈90度抵住门框，身体前倾',
      tips: [
        '手臂可调整不同角度拉伸',
        '感到胸部和前肩拉伸',
        '不要过度前倾',
        '保持呼吸自然'
      ]
    },
    {
      id: 'stretch_09',
      name: '肩后侧拉伸',
      category: 'stretch',
      duration: '每侧30秒',
      image: '/images/stretch/stretch_09.png',
      description: '一臂横过胸前，另一手按住手臂靠近身体',
      tips: [
        '不要耸肩，保持肩膀下沉',
        '感到肩后侧拉伸',
        '力度适中，不要太用力',
        '保持呼吸自然'
      ]
    },
    {
      id: 'stretch_10',
      name: '手腕屈肌拉伸',
      category: 'stretch',
      duration: '每侧20秒×2',
      image: '/images/stretch/stretch_10.png',
      description: '手臂伸直掌心朝上，另一手向下压手指；然后掌心朝下拉伸',
      tips: [
        '掌心朝上拉伸手腕内侧',
        '掌心朝下拉伸手腕外侧',
        '力度适中，感到拉伸即可',
        '如有疼痛立即停止'
      ]
    },
    {
      id: 'stretch_11',
      name: '手腕伸肌拉伸',
      category: 'stretch',
      duration: '每侧20秒',
      image: '/images/stretch/stretch_11.png',
      description: '手臂伸直掌心朝下，另一手向下压手背',
      tips: [
        '感到手腕外侧和前臂拉伸',
        '力度要轻柔',
        '保持手臂伸直',
        '适合经常用电脑的人'
      ]
    },
    {
      id: 'stretch_12',
      name: '颈部拉伸',
      category: 'stretch',
      duration: '每侧20秒×4',
      image: '/images/stretch/stretch_12.png',
      description: '坐姿，轻轻拉头部向肩膀，然后低头、抬头拉伸不同方向',
      tips: [
        '动作要轻柔，不要用力拉',
        '每个方向保持20秒',
        '如有头晕立即停止',
        '不要做颈部环绕'
      ]
    }
  ],

  // ==================== 强化动作 (15个) ====================
  strength: [
    {
      id: 'strength_01',
      name: '臀桥',
      category: 'strength',
      sets: 3,
      reps: 12,
      rest: '60秒',
      image: '/images/strength/strength_01.png',
      description: '仰卧，双脚踩地与臀同宽，收紧臀部抬起骨盆至身体成直线',
      tips: [
        '臀部发力，不要用腰部代偿',
        '顶端停留2秒挤压臀部',
        '不要过度挺腰',
        '缓慢放下，不要快速落下',
        '如颈部不适可在头下垫毛巾'
      ]
    },
    {
      id: 'strength_02',
      name: '靠墙静蹲',
      category: 'strength',
      sets: 3,
      duration: '30秒',
      rest: '60秒',
      image: '/images/strength/strength_02.png',
      description: '背靠墙壁，双脚离墙约60cm，缓慢下蹲至大腿接近平行地面',
      tips: [
        '膝盖不超过脚尖',
        '膝盖对准脚尖方向，不要内扣',
        '如有疼痛减小下蹲角度',
        '背部完全贴墙',
        '保持正常呼吸'
      ]
    },
    {
      id: 'strength_03',
      name: '直腿抬高',
      category: 'strength',
      sets: 3,
      reps: 15,
      rest: '60秒',
      image: '/images/strength/strength_03.png',
      description: '仰卧，一腿弯曲踩地，另一腿伸直抬起至约45度',
      tips: [
        '保持膝盖伸直',
        '感到大腿前侧发力',
        '缓慢放下但不触地',
        '如腰部不适可减小抬起幅度',
        '另一腿保持稳定'
      ]
    },
    {
      id: 'strength_04',
      name: '蚌式开合',
      category: 'strength',
      sets: 3,
      reps: 15,
      rest: '60秒',
      image: '/images/strength/strength_04.png',
      description: '侧卧，双膝弯曲，双脚并拢，上方膝盖向上打开如蚌壳',
      tips: [
        '保持骨盆稳定，不要后仰',
        '感到臀部侧面发力',
        '脚跟保持并拢',
        '可套弹力带增加阻力',
        '动作要缓慢控制'
      ]
    },
    {
      id: 'strength_05',
      name: '鸟狗式',
      category: 'strength',
      sets: 3,
      reps: '每侧10次',
      rest: '60秒',
      image: '/images/strength/strength_05.png',
      description: '四点跪姿，同时伸出对侧手和脚至与身体平行',
      tips: [
        '保持核心收紧',
        '骨盆不要晃动',
        '不要塌腰或拱背',
        '停留3秒后换边',
        '目视地面保持颈椎中立'
      ]
    },
    {
      id: 'strength_06',
      name: '死虫式',
      category: 'strength',
      sets: 3,
      reps: '每侧10次',
      rest: '60秒',
      image: '/images/strength/strength_06.png',
      description: '仰卧，双臂伸直指向天花板，双腿抬起呈90度，交替伸出对侧手和脚',
      tips: [
        '保持腰部贴地不要拱起',
        '动作要缓慢控制',
        '呼气时伸出，吸气时收回',
        '如腰部不适减小幅度',
        '核心全程收紧'
      ]
    },
    {
      id: 'strength_07',
      name: '平板支撑',
      category: 'strength',
      sets: 3,
      duration: '30秒',
      rest: '60秒',
      image: '/images/strength/strength_07.png',
      description: '俯卧撑姿势或用前臂支撑，身体成一条直线',
      tips: [
        '收紧核心和臀部',
        '不要塌腰或拱背',
        '保持正常呼吸，不要憋气',
        '如腰部不适立即停止',
        '初学者可从膝撑开始'
      ]
    },
    {
      id: 'strength_08',
      name: '侧平板支撑',
      category: 'strength',
      sets: 3,
      duration: '每侧20秒',
      rest: '60秒',
      image: '/images/strength/strength_08.png',
      description: '侧卧用前臂支撑，身体成直线，臀部抬起',
      tips: [
        '保持骨盆稳定',
        '不要前后晃动',
        '感到核心侧面发力',
        '初学者可屈膝支撑',
        '保持正常呼吸'
      ]
    },
    {
      id: 'strength_09',
      name: '站姿弹力带外旋',
      category: 'strength',
      sets: 3,
      reps: 15,
      rest: '60秒',
      image: '/images/strength/strength_09.png',
      description: '站立，肘部贴身弯曲90度，双手握住弹力带，向外旋转前臂',
      tips: [
        '肘部始终贴紧身体',
        '感到肩后侧发力',
        '动作要缓慢控制',
        '弹力带阻力适中',
        '不要耸肩'
      ]
    },
    {
      id: 'strength_10',
      name: '弹力带拉面式',
      category: 'strength',
      sets: 3,
      reps: 12,
      rest: '60秒',
      image: '/images/strength/strength_10.png',
      description: '双手握住弹力带与肩同宽，手臂伸直，向两侧拉开弹力带至手臂呈Y字',
      tips: [
        '感到肩胛骨中间发力',
        '不要耸肩',
        '动作要缓慢',
        '保持核心收紧',
        '拉到最大幅度时停留1秒'
      ]
    },
    {
      id: 'strength_11',
      name: '手腕屈伸',
      category: 'strength',
      sets: 3,
      reps: 15,
      rest: '45秒',
      image: '/images/strength/strength_11.png',
      description: '前臂放在桌上，手腕悬空，向上弯曲手腕再缓慢放下',
      tips: [
        '掌心朝上和朝下各做一组',
        '动作要缓慢控制',
        '如有疼痛减轻幅度',
        '可握哑铃或水瓶增加阻力',
        '保持前臂稳定'
      ]
    },
    {
      id: 'strength_12',
      name: '握力练习',
      category: 'strength',
      sets: 3,
      reps: 15,
      rest: '45秒',
      image: '/images/strength/strength_12.png',
      description: '使用握力器或软球，用力握紧保持5秒，然后放松',
      tips: [
        '握紧时保持5秒',
        '感到前臂发力',
        '如有疼痛减轻力度',
        '可使用网球或毛巾替代',
        '保持手腕中立'
      ]
    },
    {
      id: 'strength_13',
      name: '坐姿腿屈伸',
      category: 'strength',
      sets: 3,
      reps: 15,
      rest: '60秒',
      image: '/images/strength/strength_13.png',
      description: '坐在椅子上，一腿伸直抬起至与地面平行，保持5秒，缓慢放下',
      tips: [
        '感到大腿前侧发力',
        '保持上身直立',
        '缓慢放下，不要快速落下',
        '可在脚踝加沙袋增加阻力',
        '如膝盖不适减小幅度'
      ]
    },
    {
      id: 'strength_14',
      name: '单腿站立',
      category: 'strength',
      sets: 3,
      duration: '每侧30秒',
      rest: '30秒',
      image: '/images/strength/strength_14.png',
      description: '单腿站立保持平衡，另一腿微屈抬起',
      tips: [
        '可扶墙开始练习',
        '逐渐减少辅助',
        '可闭眼增加难度',
        '训练本体感觉',
        '注意踝关节稳定性'
      ]
    },
    {
      id: 'strength_15',
      name: '脚跟抬起',
      category: 'strength',
      sets: 3,
      reps: 15,
      rest: '45秒',
      image: '/images/strength/strength_15.png',
      description: '站立，慢慢抬起脚跟用脚尖站立，保持2秒，缓慢放下',
      tips: [
        '感到小腿发力',
        '可手扶墙保持平衡',
        '动作要缓慢控制',
        '可在台阶边缘做增加幅度',
        '保持身体直立'
      ]
    }
  ],

  // ==================== 放松动作 (5个) ====================
  relax: [
    {
      id: 'relax_01',
      name: '泡沫轴放松大腿前侧',
      category: 'relax',
      duration: '每侧60秒',
      image: '/images/relax/relax_01.png',
      description: '俯卧，泡沫轴放在大腿下方，用手臂支撑前后滚动',
      tips: [
        '从膝盖上方到髋部滚动',
        '找到痛点停留20-30秒',
        '缓慢深呼吸放松',
        '不要直接压在膝盖上',
        '力度适中，不要太痛'
      ]
    },
    {
      id: 'relax_02',
      name: '泡沫轴放松大腿外侧',
      category: 'relax',
      duration: '每侧60秒',
      image: '/images/relax/relax_02.png',
      description: '侧卧，泡沫轴放在大腿外侧，上下滚动',
      tips: [
        '从膝盖到髋部滚动',
        '找到痛点停留',
        '可调整身体角度放松不同位置',
        '如有剧痛减轻压力',
        '保持呼吸自然'
      ]
    },
    {
      id: 'relax_03',
      name: '泡沫轴放松小腿',
      category: 'relax',
      duration: '每侧60秒',
      image: '/images/relax/relax_03.png',
      description: '坐姿，泡沫轴放在小腿下方，双手撑地，臀部抬起前后滚动',
      tips: [
        '可叠腿增加压力',
        '滚动整个小腿',
        '找到痛点停留',
        '放松跟腱区域',
        '如有剧痛减轻压力'
      ]
    },
    {
      id: 'relax_04',
      name: '泡沫轴放松背部',
      category: 'relax',
      duration: '60秒',
      image: '/images/relax/relax_04.png',
      description: '仰卧，泡沫轴放在上背部下方，双手抱头，上下滚动',
      tips: [
        '从肩胛骨到中背部滚动',
        '找到紧张区域停留',
        '不要滚到下背部',
        '保持头部和颈部放松',
        '可调整角度放松不同位置'
      ]
    },
    {
      id: 'relax_05',
      name: '深呼吸放松',
      category: 'relax',
      reps: '10次',
      image: '/images/relax/relax_05.png',
      description: '仰卧，双膝弯曲，双手放在腹部，深呼吸放松全身',
      tips: [
        '吸气4秒腹部鼓起',
        '屏气2秒',
        '呼气6秒腹部收缩',
        '放松全身肌肉',
        '专注于呼吸'
      ]
    }
  ]
}

// 获取所有动作的扁平列表
export const getAllExercises = () => {
  const all = []
  Object.values(exercises).forEach(category => {
    all.push(...category)
  })
  return all
}

// 根据ID获取动作
export const getExerciseById = (id) => {
  const all = getAllExercises()
  return all.find(ex => ex.id === id)
}

// 根据分类获取动作
export const getExercisesByCategory = (category) => {
  return exercises[category] || []
}
