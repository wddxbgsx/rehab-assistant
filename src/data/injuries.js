// 损伤类型数据库
export const injuryCategories = [
  {
    category: '肩部',
    injuries: [
      { id: 'shoulder_impingement', name: '肩峰撞击', description: '肩部疼痛，抬手时加重' },
      { id: 'rotator_cuff', name: '肩袖损伤', description: '肩部无力，活动受限' },
      { id: 'frozen_shoulder', name: '肩周炎', description: '肩部僵硬，活动范围减小' }
    ]
  },
  {
    category: '腰部',
    injuries: [
      { id: 'lumbar_strain', name: '腰肌劳损', description: '腰部酸痛，久坐加重' },
      { id: 'disc_herniation', name: '腰椎间盘突出', description: '腰痛伴下肢放射痛' }
    ]
  },
  {
    category: '膝盖',
    injuries: [
      { id: 'chondromalacia', name: '髌骨软化', description: '膝盖前方疼痛，上下楼梯加重' },
      { id: 'meniscus', name: '半月板损伤', description: '膝盖疼痛，有弹响或卡住感' }
    ]
  },
  {
    category: '手腕',
    injuries: [
      { id: 'tendinitis', name: '腱鞘炎', description: '手腕疼痛，活动时加重' },
      { id: 'carpal_tunnel', name: '腕管综合征', description: '手指麻木，夜间加重' }
    ]
  },
  {
    category: '其他',
    injuries: [
      { id: 'tennis_elbow', name: '网球肘', description: '肘部外侧疼痛，握力减弱' },
      { id: 'plantar_fasciitis', name: '足底筋膜炎', description: '脚底疼痛，早晨起床时加重' }
    ]
  }
]

// 损伤类型到动作的映射
export const injuryExerciseMapping = {
  // 肩峰撞击
  shoulder_impingement: {
    warmup: ['warmup_01', 'warmup_04', 'warmup_05'],
    stretch: ['stretch_08', 'stretch_09', 'stretch_12'],
    strength: ['strength_09', 'strength_10', 'strength_07'],
    relax: ['relax_04', 'relax_05'],
    dailyTips: [
      '避免手臂高举过头的动作',
      '睡觉时避免压到患侧肩膀',
      '使用电脑时保持肘部有支撑',
      '避免单侧背包，使用双肩包'
    ]
  },

  // 肩袖损伤
  rotator_cuff: {
    warmup: ['warmup_01', 'warmup_04'],
    stretch: ['stretch_08', 'stretch_09', 'stretch_12'],
    strength: ['strength_09', 'strength_10'],
    relax: ['relax_04', 'relax_05'],
    dailyTips: [
      '避免提重物',
      '避免手臂高举过头',
      '睡觉时可用枕头支撑手臂',
      '避免侧睡压到患侧'
    ]
  },

  // 肩周炎
  frozen_shoulder: {
    warmup: ['warmup_01', 'warmup_04', 'warmup_05'],
    stretch: ['stretch_08', 'stretch_09', 'stretch_12'],
    strength: ['strength_09', 'strength_10'],
    relax: ['relax_04', 'relax_05'],
    dailyTips: [
      '坚持每天活动肩关节，但不要过度',
      '避免长时间保持同一姿势',
      '注意肩部保暖',
      '可热敷后再做拉伸'
    ]
  },

  // 腰肌劳损
  lumbar_strain: {
    warmup: ['warmup_01', 'warmup_03', 'warmup_05'],
    stretch: ['stretch_04', 'stretch_05', 'stretch_06', 'stretch_07'],
    strength: ['strength_01', 'strength_05', 'strength_06', 'strength_07'],
    relax: ['relax_04', 'relax_05'],
    dailyTips: [
      '坐姿时保持腰部有支撑，可使用靠垫',
      '避免久坐，每隔45分钟起身活动',
      '弯腰搬重物时先蹲下，用腿部发力',
      '睡觉时可在膝盖下垫枕头，减轻腰部压力'
    ]
  },

  // 腰椎间盘突出
  disc_herniation: {
    warmup: ['warmup_01', 'warmup_03'],
    stretch: ['stretch_05', 'stretch_06'],
    strength: ['strength_05', 'strength_06', 'strength_07'],
    relax: ['relax_05'],
    dailyTips: [
      '避免弯腰和扭转动作',
      '避免久坐，使用有腰部支撑的椅子',
      '睡觉时侧卧屈膝或仰卧膝下垫枕',
      '避免提重物，如需搬运请屈膝下蹲',
      '如有下肢麻木或无力请立即就医'
    ]
  },

  // 髌骨软化
  chondromalacia: {
    warmup: ['warmup_01', 'warmup_02', 'warmup_05'],
    stretch: ['stretch_01', 'stretch_02', 'stretch_03'],
    strength: ['strength_01', 'strength_02', 'strength_03', 'strength_04', 'strength_13'],
    relax: ['relax_01', 'relax_02', 'relax_05'],
    dailyTips: [
      '避免长时间保持同一姿势，每隔1小时起身活动',
      '上下楼梯时尽量使用扶手，减轻膝盖负担',
      '避免深蹲、跪姿等膝盖压力大的动作',
      '注意膝盖保暖，避免受凉',
      '如训练后疼痛加重，减少训练量或暂停训练'
    ]
  },

  // 半月板损伤
  meniscus: {
    warmup: ['warmup_01', 'warmup_02'],
    stretch: ['stretch_01', 'stretch_02', 'stretch_03'],
    strength: ['strength_01', 'strength_04', 'strength_14', 'strength_15'],
    relax: ['relax_01', 'relax_02', 'relax_05'],
    dailyTips: [
      '避免急转、急停动作',
      '避免深蹲和跳跃',
      '上下楼梯要缓慢',
      '如有卡住感或突然剧痛请就医',
      '可佩戴护膝增加稳定性'
    ]
  },

  // 腱鞘炎
  tendinitis: {
    warmup: ['warmup_01'],
    stretch: ['stretch_10', 'stretch_11', 'stretch_12'],
    strength: ['strength_11', 'strength_12'],
    relax: ['relax_05'],
    dailyTips: [
      '避免长时间重复性手腕动作',
      '使用电脑时保持手腕中立位',
      '可佩戴护腕减轻压力',
      '冷敷可缓解急性疼痛',
      '使用工具时选择粗柄可减少手腕负担'
    ]
  },

  // 腕管综合征
  carpal_tunnel: {
    warmup: ['warmup_01'],
    stretch: ['stretch_10', 'stretch_11', 'stretch_12'],
    strength: ['strength_11', 'strength_12'],
    relax: ['relax_05'],
    dailyTips: [
      '使用电脑时保持手腕中立位',
      '避免长时间弯曲手腕',
      '睡觉时可佩戴腕部支具',
      '避免重复性手腕动作',
      '如有手指持续麻木请就医'
    ]
  },

  // 网球肘
  tennis_elbow: {
    warmup: ['warmup_01'],
    stretch: ['stretch_10', 'stretch_11'],
    strength: ['strength_11', 'strength_12'],
    relax: ['relax_05'],
    dailyTips: [
      '避免重复性手腕和手指动作',
      '使用工具时选择轻便的',
      '可佩戴肘部护具',
      '拧毛巾、提重物时注意姿势',
      '冷敷可缓解急性疼痛'
    ]
  },

  // 足底筋膜炎
  plantar_fasciitis: {
    warmup: ['warmup_01', 'warmup_05'],
    stretch: ['stretch_03'],
    strength: ['strength_15', 'strength_14'],
    relax: ['relax_03', 'relax_05'],
    dailyTips: [
      '早晨下床前先活动脚踝和脚趾',
      '选择有足弓支撑的鞋子',
      '避免长时间站立或行走',
      '可在脚下踩网球按摩',
      '睡前拉伸小腿和足底'
    ]
  }
}

// 获取所有损伤类型（扁平列表）
export const getAllInjuries = () => {
  const all = []
  injuryCategories.forEach(cat => {
    cat.injuries.forEach(injury => {
      all.push({ ...injury, category: cat.category })
    })
  })
  return all
}

// 根据ID获取损伤信息
export const getInjuryById = (id) => {
  return getAllInjuries().find(i => i.id === id)
}

// 搜索损伤类型
export const searchInjuries = (keyword) => {
  const all = getAllInjuries()
  if (!keyword) return all
  const lower = keyword.toLowerCase()
  return all.filter(i => 
    i.name.includes(keyword) || 
    i.description.includes(keyword) ||
    i.category.includes(keyword)
  )
}
