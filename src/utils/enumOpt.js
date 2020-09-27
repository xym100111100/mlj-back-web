/**
 * Created by jin.zhouhang on 17-9-21 下午3:02.
 *
 * 枚举处理工具
 */

function initData() {
  var enumOpts = [];
  /** 负债状态*/
  enumOpts[100] = {
    enumName: 'DebtStatusEnum',
    values: [{
      code: '0',
      message: '已提交'
    }, {
      code: '1',
      message: '审核中'
    }, {
      code: '2',
      message: '审核通过'
    }, {
      code: '3',
      message: '审核拒绝'
    }, {
      code: '4',
      message: '签约中'
    }, {
      code: '5',
      message: '已签约'
    }, {
      code: '6',
      message: '签约失败'
    }, {
      code: '7',
      message: '放款中'
    }, {
      code: '8',
      message: '回款中'
    }, {
      code: '9',
      message: '已回款'
    }, {
      code: '10',
      message: '已逾期'
    }, {
      code: '11',
      message: '已作废'
    }, {
      code: '12',
      message: '结清中'
    }]
  };

  /** 负债状态*/
  enumOpts[0] = {
    enumName: 'LoanStatusEnum',
    values: [{
      code: 'SUBMITED',
      message: '已提交'
    }, {
      code: 'AUDITING',
      message: '审核中'
    }, {
      code: 'AUDITED',
      message: '审核通过'
    }, {
      code: 'AUDITREJECT',
      message: '审核拒绝'
    }, {
      code: 'SIGNING',
      message: '签约中'
    }, {
      code: 'SIGNED',
      message: '已签约'
    }, {
      code: 'SIGNFAIL',
      message: '签约失败'
    }, {
      code: 'LOANING',
      message: '放款中'
    }, {
      code: 'BACKING',
      message: '回款中'
    }, {
      code: 'BACKED',
      message: '已回款'
    }, {
      code: 'OVERDUE',
      message: '已逾期'
    }, {
      code: 'CANCELED',
      message: '已作废'
    }]
  };
  /** 借款类型*/
  enumOpts[1] = {
    enumName: 'LoanTypeEnum',
    values: [{
        code: 'NEW',
        message: '新增'
      },
      {
        code: 'CONTINUE',
        message: '续贷'
      },
      {
        code: 'EXTENSION',
        message: '展期'
      },
      {
        code: 'PART_EXT',
        message: '减额展期'
      },
    ]
  };
  /** 结转方式*/
  enumOpts[2] = {
    enumName: 'LoanBackTypeEnum',
    values: [{
        code: 'SETTL',
        message: '正常结清'
      },
      {
        code: 'CONTINUE',
        message: '续贷结清'
      },
      {
        code: 'EXTENSION',
        message: '展期结清'
      },
      {
        code: 'PART_EXT',
        message: '减额结清'
      },
      {
        code: 'OVERDUE',
        message: '逾期结清'
      },
      {
        code: 'AHEAD',
        message: '提前结清'
      },
    ]
  };
  /** 联系类型*/
  enumOpts[3] = {
    enumName: 'LoanOperateTypeEnum',
    values: [{
        code: 'SUBMITING',
        message: '提交借款'
      },
      {
        code: 'AUDITING',
        message: '财务通过'
      },
      {
        code: 'REFUSEING',
        message: '退回'
      },
      {
        code: 'REMINDING',
        message: '结转提醒'
      },
      {
        code: 'OVERDUING',
        message: '自动逾期'
      },
      {
        code: 'CONFIRMING',
        message: '结转确认'
      },
      {
        code: 'CANCELING',
        message: '借款作废'
      },
    ]
  };
  /** 客户联系类型*/
  enumOpts[4] = {
    enumName: 'ClientContactTypeEnum',
    values: [{
        code: 'SALE',
        message: '销售联系'
      },
      {
        code: 'APPLY',
        message: '借款申请'
      },
      {
        code: 'AUDIT',
        message: '财务通过'
      },
      {
        code: 'CHECK',
        message: '贷后检查'
      },
      {
        code: 'REMIND',
        message: '结转提醒'
      },
      {
        code: 'COLLECT',
        message: '逾期催收'
      },
    ]
  };
  /** 逾期状态*/
  enumOpts[5] = {
    enumName: 'CollectStatusEnum',
    values: [{
        code: 'INIT',
        message: '新增催收'
      },
      {
        code: 'FOLLOW',
        message: '已跟进'
      },
      {
        code: 'SUBMITED',
        message: '财务确认'
      },
      {
        code: 'BACKED',
        message: '已还款'
      },
      {
        code: 'OUTSOURCE',
        message: '委外催收'
      },
    ]
  };
  /** 逾期结清方式*/
  enumOpts[6] = {
    enumName: 'BackedModeEnum',
    values: [{
        code: 'A',
        message: '等本等金'
      },
      {
        code: 'B',
        message: '等额本息'
      }, {
        code: 'C',
        message: '等额本金'
      }, {
        code: 'D',
        message: '到期还本付息'
      }, {
        code: 'E',
        message: '按月还息到期还本'
      },
    ]
  };


  /** 文件状态*/
  enumOpts[7] = {
    enumName: 'OriginIndexStateEnum',
    values: [{
        code: 'INIT',
        message: '初始化'
      },
      {
        code: 'ERROR',
        message: '错误'
      },
      {
        code: 'FINISH',
        message: '结束'
      },
    ]
  };
  /** 银行卡类型 */
  enumOpts[8] = {
    enumName: 'CardRelationEnum',
    values: [{
        code: 'LEND',
        message: '回款卡'
      },
      {
        code: 'BACKUP',
        message: '回款备选卡'
      },
      {
        code: 'RAISE',
        message: '放款卡'
      },
      {
        code: 'COLLECT',
        message: '催收卡'
      },
    ]
  };

  /** 银行卡状态 */
  enumOpts[9] = {
    enumName: 'CardStateEnum',
    values: [{
        code: '1',
        message: '有效'
      },
      {
        code: '0',
        message: '无效'
      },
    ]
  };

  /** 还款状态 */
  enumOpts[10] = {
    enumName: 'BackedStatusEnum',
    values: [{
        code: 'SUBMITED',
        message: '待审核'
      },
      {
        code: 'AUDITED',
        message: '已确认'
      },
      {
        code: 'CANCELED',
        message: '已作废'
      },
      {
        code: 'HOLDED',
        message: '已挂起'
      },
    ]
  };


  /** 还款方式 */
  enumOpts[11] = {
    enumName: ' BackedModeEnum',
    values: [{
        code: 'A',
        message: '等本等金'
      },
      {
        code: 'B',
        message: '等额本息'
      }, {
        code: 'C',
        message: '等额本金'
      }, {
        code: 'D',
        message: '到期还本付息'
      }, {
        code: 'E',
        message: '按月还息到期还本'
      },
    ]
  };

  /** 还款类型 */
  enumOpts[12] = {
    enumName: 'BackedTypeEnum',
    values: [{
        code: 'REMIND',
        message: '提醒还款'
      },
      {
        code: 'COLLECT',
        message: '催收还款'
      },
    ]
  };

  /** 用户状态 */
  enumOpts[13] = {
    enumName: 'UserStatusEnum',
    values: [{
        code: 'NORMAL',
        message: '正常'
      },
      {
        code: 'LOCK',
        message: '锁定'
      },
      {
        code: 'LOGOFF',
        message: '注销'
      }
    ]
  }

  /** 放款单类型 */
  enumOpts[14] = {
    enumName: 'LoanRaiseTypeEnum',
    values: [{
        code: 'TRANSFER',
        message: '线下转账'
      },
      {
        code: 'PAY',
        message: '代付'
      },
    ]
  };

  /** 放款单状态 */
  enumOpts[15] = {
    enumName: 'LoanRaiseStatusEnum',
    values: [{
        code: 'INIT',
        message: '新创建'
      },
      {
        code: 'WAIT',
        message: '待处理'
      },
      {
        code: 'SUCC',
        message: '处理成功'
      },
      {
        code: 'FAIL',
        message: '处理失败'
      },
    ]
  };

  /** 客户来源 */
  enumOpts[16] = {
    enumName: 'ClientOriginTypeEnum',
    values: [{
        code: 'EXCEL',
        message: '白名单'
      },
      {
        code: 'HTTP',
        message: '天女引流'
      },
      {
        code: 'ESALE',
        message: '电销'
      },
    ]
  };


  /** 还款类型 */
  enumOpts[17] = {
    enumName: 'BackedTypeEnum',
    values: [{
        code: 'REMIND',
        message: '提醒还款'
      },
      {
        code: 'COLLECT',
        message: '催收还款'
      },
    ]
  }

  /** 还款方式 */
  enumOpts[18] = {
    enumName: 'BackedTransferTypeEnum',
    values: [{
        code: 'TRANSFER',
        message: '线下转账'
      },
      {
        code: 'PROTOCOL',
        message: '协议代扣'
      },
    ]
  };

  /** 还款状态 */
  enumOpts[19] = {
    enumName: 'repaymentStatusEnum',
    values: [{
        code: 'UN_BACK',
        message: '未到期'
      },
      {
        code: 'BACKED',
        message: '结清-正常还款'
      },
      {
        code: 'EARLY_BACKED',
        message: '结清-提前结清'
      },
      {
        code: 'OVERDUED',
        message: '已逾期'
      },
      {
        code: 'OVERDUE_BACKED',
        message: '结清-逾期已还'
      },
      {
        code: 'IN_REPAYMENT',
        message: '本期-还款中'
      },
      {
        code: 'CURRENT_PERIOD',
        message: '本期'
      },
    ]
  };



  /** 还款类别 */
  enumOpts[21] = {
    enumName: 'CollectBizTypeEnum',
    values: [{
      code: 'service-pandora',
      message: 'pandora'
    }, ]
  };


  /** 客户借款状态 */
  enumOpts[22] = {
    enumName: 'ClientDebtStateEnum',
    values: [{
        code: 'NORMAL',
        message: '正常'
      },
      {
        code: 'RELEASE',
        message: '已释放'
      },
      {
        code: 'SIGNED',
        message: '已签约'
      },
      {
        code: 'FROZEN',
        message: '已冻结'
      },
    ]
  }

  /** 小米分放款单状态 */
  enumOpts[23] = {
    enumName: 'XmRaiseBackedStatus',
    values: [{
        code: 'CREATED',
        message: '新创建'
      },
      {
        code: 'SUBMITED',
        message: '提交处理'
      },
      {
        code: 'FINISHED',
        message: '处理完成'
      },
    ]
  };

  /** 成功和失败状态 */
  enumOpts[24] = {
    enumName: 'SuccessAndFail',
    values: [{
        code: 'FAIL',
        message: '失败'
      },
      {
        code: 'SUCCESS',
        message: '成功'
      },
    ]
  };

  /** 有效状态 */
  enumOpts[25] = {
    enumName: 'ValidStatusEnmu',
    values: [{
        code: 'ENABLED',
        message: '有效'
      },
      {
        code: 'UNABLED',
        message: '无效'
      },
    ]
  };

  /** 合同类型 */
  enumOpts[26] = {
    enumName: 'ContractTypeEnmu',
    values: [{
        code: 'MLJ_LOAN',
        message: '美丽金借款合同'
      },
      {
        code: 'MLJ_SECRET',
        message: '美丽金隐私合同'
      },
      {
        code: 'MLJ_SERVICE',
        message: '美丽金服务合同'
      },
    ]
  };

  /** 产品类型 */
  enumOpts[27] = {
    enumName: 'ProductTypeEnmu',
    values: [{
        code: 'P001',
        message: '美丽金'
      },
      {
        code: 'P002',
        message: '丽人贷'
      },
      {
        code: 'P003',
        message: '有钱花'
      },
    ]
  };

  /** 是否合同保全 */
  enumOpts[28] = {
    enumName: 'SaveContractEnmu',
    values: [{
        code: 'yes',
        message: '是'
      },
      {
        code: 'no',
        message: '否'
      }
    ]
  };
  /** 签约状态 */
  enumOpts[29] = {
    enumName: 'SignStateEnmu',
    values: [{
        code: 'UNSIGN',
        message: '未签约'
      },
      {
        code: 'SIGN_CONFIRM',
        message: '确认签约'
      },
      {
        code: 'SIGN_HANDLE',
        message: '签约已处理'
      },
      {
        code: 'SIGNED',
        message: '签约已完成'
      },
      {
        code: 'CANCELED',
        message: '已作废'
      },
    ]
  };

  /** 负债类型 */
  enumOpts[30] = {
    enumName: 'DebtTypeEnmu',
    values: [{
        code: '0',
        message: '登记负债'
      },
      {
        code: '1',
        message: '扣款冲账'
      },
      {
        code: '2',
        message: '新增罚息'
      }
    ]
  };
  /** 负债状态 */
  enumOpts[31] = {
    enumName: 'DebtStateEnmu',
    values: [{
        code: 'AState',
        message: 'A状态'
      },
      {
        code: 'BState',
        message: 'B状态'
      },
      {
        code: 'CState',
        message: 'C状态'
      }
    ]
  };

  /** 业务类型 */
  enumOpts[32] = {
    enumName: 'BizTypeEnmu',
    values: [{
        code: 'AType',
        message: '业务A类型'
      },
      {
        code: 'BType',
        message: '业务B类型'
      },
      {
        code: 'CType',
        message: '业务C类型'
      },
      {
        code: 'DType',
        message: '业务D类型'
      },
    ]
  };

  /** 性别 */
  enumOpts[33] = {
    enumName: 'SexTypeEnmu',
    values: [{
        code: '1',
        message: '男'
      },
      {
        code: '2',
        message: '女'
      },
      {
        code: '0',
        message: '未知'
      },
    ]
  };

  /** 用户类型 */
  enumOpts[34] = {
    enumName: 'UserTypeEnmu',
    values: [{
        code: 1,
        message: '管理员'
      },
      {
        code: 2,
        message: '业务员'
      },
      {
        code: 3,
        message: '合作商'
      },
      {
        code: 4,
        message: '客服'
      }
    ]
  };


  /** 证件类型 */
  enumOpts[35] = {
    enumName: 'certTypeEnmu',
    values: [{
      code: '1',
      message: '居民身份证'
    }, ]
  };
  // RealAuthStateEnmu
  /** 实名认证状态格式 */
  enumOpts[36] = {
    enumName: 'RealAuthStateEnmu',
    values: [{
        code: '0',
        message: '已提交'
      },
      {
        code: '1',
        message: '审核中'
      },
      {
        code: '2',
        message: '审核通过'
      },
      {
        code: '3',
        message: '审核拒绝'
      },
    ]
  };

  // ClientCreditStateEnmu
  /** 授信状态格式 */
  enumOpts[37] = {
    enumName: 'ClientCreditStateEnmu',
    values: [{
        code: '0',
        message: '审核中'
      },
      {
        code: '1',
        message: '审核通过'
      },
      {
        code: '2',
        message: '审核退回'
      },
      {
        code: '3',
        message: '审核拒绝'
      },
      {
        code: '4',
        message: '授信完成'
      }
    ]
  };

  /** 授信类型名字 */
  enumOpts[38] = {
    enumName: 'creditTypeEnmu',
    values: [{
        code: '0',
        message: '支付宝'
      },
      {
        code: '1',
        message: '微信'
      },
      {
        code: '2',
        message: 'QQ'
      }
    ]
  };
  /** 学历 */
  enumOpts[39] = {
    enumName: 'educationCodeEnmu',
    values: [{
        code: 0,
        message: '初中及初中以下'
      },
      {
        code: 1,
        message: '高中/中专/技校'
      },
      {
        code: 2,
        message: '大专'
      },
      {
        code: 3,
        message: '本科'
      },
      {
        code: 4,
        message: '硕士'
      },
      {
        code: 5,
        message: '博士及以上'
      },
    ]
  };
  // 
  /** 婚姻状态 */
  enumOpts[40] = {
    enumName: 'maritalCodeEnmu',
    values: [{
        code: '0',
        message: '未婚'
      },
      {
        code: '1',
        message: '已婚'
      }
    ]
  };
  /** 期限状态 */
  enumOpts[41] = {
    enumName: 'debtLimitEnmu',
    values: [{
        code: 'D',
        message: '日'
      },
      {
        code: 'M',
        message: '月'
      },
      {
        code: 'Y',
        message: '年'
      }
    ]
  };

  /** 客户状态 */
  enumOpts[42] = {
    enumName: 'clientStateEnmu',
    values: [{
        code: 'TEMP',
        message: '临时用户'
      },
      {
        code: 'INVALID',
        message: '无效'
      },
      {
        code: 'VALID',
        message: '有效'
      },
      {
        code: 'AUTHED',
        message: '实名客户'
      },
      {
        code: 'FREEZE',
        message: '冻结'
      },
      {
        code: 'LOGOFF',
        message: '注销'
      }
    ]
  };
  /** 罚息类型 */
  enumOpts[43] = {
    enumName: 'OverdueTypeEnum',
    values: [{
      code: '0',
      message: '按逾期本金百分比'
    }]
  };
  /* 费率类型*/
  enumOpts[44] = {
    enumName: 'feeRateTypeEnmu',
    values: [{
      code: 'ANNUAL',
      message: '按年化'
    }, {
      code: 'ONCE',
      message: '按次'
    }, {
      code: 'FIX',
      message: '按固定金额'
    }]
  };
  /* 费率模板状态*/
  enumOpts[45] = {
    enumName: 'feeRateStateEnmu',
    values: [{
      code: '0',
      message: '未删除'
    }, {
      code: '1',
      message: '已删除'
    }]
  };
  /* 合作商审核状态*/
  enumOpts[46] = {
    enumName: 'partnerSateEnum',
    values: [{
        message: '未提交',
        code: 0
      },
      {
        message: '待审核',
        code: 1
      }, {
        message: '已拒绝',
        code: 2
      },
      {
        message: '已打回',
        code: 3
      }, {
        message: '已上架',
        code: 4
      },
      {
        message: '已下架',
        code: 5
      }
    ]
  };
  // depositTypeEnmu
  /** 保证金类型 */
  enumOpts[47] = {
    enumName: 'depositTypeEnmu',
    values: [{
      code: 1,
      message: '按本金百分比'
    }]
  };
  // 卡状态
  enumOpts[47] = {
    enumName: 'cardStateEnmu',
    values: [{
        code: 1,
        message: '有效'
      },
      {
        code: 0,
        message: '无效'
      }
    ]
  };
  /** 工单类型 */
  enumOpts[48] = {
    enumName: 'workOrderTypeEnmu',
    values: [{
        code: 0,
        message: '放款卡可切换状态变更'
      },
      {
        code: 1,
        message: '商户基本信息变更'
      }, {
        code: 2,
        message: '商户联系人信息变更'
      }, {
        code: 3,
        message: '商户附件信息变更'
      }
      // , {
      //   code: 4,
      //   message: '商户合作协议变更'
      // }
    ]
  };
  /** 工单状态 */
  enumOpts[49] = {
    enumName: 'workOrderStateEnmu',
    values: [{
        code: 0,
        message: '作废'
      },
      {
        code: 1,
        message: '工单创建'
      },
      {
        code: 2,
        message: '工单提交'

      }, {
        code: 3,
        message: '工单打回'
      }, {
        code: 4,
        message: '工单拒绝'
      }, {
        code: 5,
        message: '工单通过'
      }
    ]
  };

  /** 工单状态 */
  enumOpts[50] = {
    enumName: 'settleTypeEnmu',
    values: [{
        code: 1,
        message: '对公'
      },
      {
        code: 2,
        message: '对私'
      }
    ]
  };
  /** 银行卡 */
  enumOpts[51] = {
    enumName: 'BackedListEnum',
    values: [{
        value: 'CCB',
        label: '建设银行'
      },
      {
        value: 'ICBC',
        label: '工商银行'
      },
      {
        value: 'PINAGAN',
        label: '平安银行'
      },
      {
        value: 'ABC',
        label: '农业银行'
      },
      {
        value: 'CMB',
        label: '招商银行'
      },
      {
        value: 'PSBC',
        label: '邮储银行'
      },
      {
        value: 'CMBC',
        label: '民生银行'
      },
      {
        value: 'CEB',
        label: '光大银行'
      },
      {
        value: 'CITIC',
        label: '中信银行'
      },
      {
        value: 'CIB',
        label: '兴业银行'
      },
      {
        value: 'SPDB',
        label: '浦发银行'
      },
      {
        value: 'BOC',
        label: '中国银行'
      },
      {
        value: 'COMM',
        label: '交通银行'
      },
      {
        value: 'GDB',
        label: '广发银行'
      },
      {
        value: 'HXB',
        label: '华夏银行'
      },
      {
        value: 'BJB',
        label: '北京银行'
      },
      {
        value: 'SHB',
        label: '上海银行'
      },
    ]
  }
  /** 营业用地性质 */
  enumOpts[52] = {
    enumName: 'useNatureEnmu',
    values: [{
        code: '1',
        message: '租用'
      },
      {
        code: '2',
        message: '自有'
      }
    ]
  };
  /** 商户性质 */
  enumOpts[53] = {
    enumName: 'merchantNatureEnmu',
    values: [{
        code: 0,
        message: '私营'
      },
      {
        code: 1,
        message: '个体'
      },
      {
        code: 2,
        message: '集体'
      },
      {
        code: 3,
        message: '国营'
      },
      {
        code: 4,
        message: '合资'
      },
      {
        code: 5,
        message: '股份制'
      },
      {
        code: 6,
        message: '其他'
      }
    ]
  };

  /** 分支机构情况 */
  enumOpts[54] = {
    enumName: 'branchEnmu',
    values: [{
        code: '0',
        message: '诊所及个体户'
      },
      {
        code: '1',
        message: '普通医院'
      },
      {
        code: '2',
        message: '集团化'
      }
    ]
  };
  // 行业从事
  enumOpts[55] = {
    enumName: 'industryEnmu',
    values: [{
        code: 'IT服务',
        message: 'IT服务'
      },
      {
        code: '制造业',
        message: '制造业'
      },
      {
        code: '批发/零售',
        message: '批发/零售'
      },
      {
        code: '生活服务',
        message: '生活服务'
      },
      {
        code: '文化/体育/娱乐业',
        message: '文化/体育/娱乐业'
      },
      {
        code: '建筑/房地产',
        message: '建筑/房地产'
      },
      {
        code: '教育',
        message: '教育'
      },
      {
        code: '运输/物流/仓储',
        message: '运输/物流/仓储'
      },
      {
        code: '医疗',
        message: '医疗'
      },
      {
        code: '政府机构',
        message: '政府机构'
      },
      {
        code: '金融',
        message: '金融'
      },
      {
        code: '能源/采矿',
        message: '能源/采矿'
      },
      {
        code: '农林渔牧',
        message: '农林渔牧'
      },
      {
        code: '其他行业',
        message: '其他行业'
      },
    ]
  };

  // // 商户注册名称
  // enumOpts[56] = {
  //   enumName: 'regNameEnmu',
  //   values: [{
  //       code: 'aabb',
  //       message: 'aabb'
  //     },
  //     {
  //       code: 'bbaa',
  //       message: 'bbaa'
  //     },
  //     {
  //       code: '医院三号',
  //       message: '医院三号'
  //     },
  //     {
  //       code: '医院四号',
  //       message: '医院四号'
  //     }
  //   ]
  // };

  // 期数
  enumOpts[57] = {
    enumName: 'limitEnmu',
    values: [{
        code: 3,
        message: '3'
      },
      {
        code: 6,
        message: '6'
      },
      {
        code: 9,
        message: '9'
      },
      {
        code: 12,
        message: '12'
      },
      {
        code: 18,
        message: '18'
      },
      {
        code: 24,
        message: '24'
      },
      {
        code: 36,
        message: '36'
      }
    ]
  };


  // 商户性质
  enumOpts[59] = {
    enumName: 'partnerNatureEnmu',
    values: [{
        code: '私营',
        message: '私营'
      },
      {
        code: '个体',
        message: '个体'
      },
      {
        code: '集体',
        message: '集体'
      },
      {
        code: '国营',
        message: '国营'
      },
      {
        code: '合资',
        message: '合资'
      },
      {
        code: '股份制',
        message: '股份制'
      },
      {
        code: '其他',
        message: ''
      },

    ]
  };

  // 商户等级
  enumOpts[58] = {
    enumName: 'partnerGradeEnmu',
    values: [{
        code: 2,
        message: '高'
      },
      {
        code: 1,
        message: '中'
      },
      {
        code: 0,
        message: '低'
      },
    ]
  };



  return enumOpts;
}


export const getEnumUtils = {
  install: function (Vue) {
    Vue.prototype.$getEnumUtils = {
      getEnum(enumName) {
        let enumOpts = initData();
        for (var enumOptNum in enumOpts) {
          if (enumOpts[enumOptNum].enumName == enumName) {
            return enumOpts[enumOptNum].values
          }
        }
      }

    }
  }
}

const enumUtils = {
  install: function (Vue) {
    Vue.prototype.$enumUtils = {
      toMsg(enumName, code) {
        let enumOpts = initData();
        for (var enumOptNum in enumOpts) {
          if (enumOpts[enumOptNum].enumName == enumName) {
            for (var msgNum in enumOpts[enumOptNum].values) {
              if (enumOpts[enumOptNum].values[msgNum].code == code) {
                return enumOpts[enumOptNum].values[msgNum].message
              }
            }
          }
        }
        return ' '
      },

      toValue(enumName) {
        var enumOpts = [];

        /** 银行卡 */
        enumOpts[0] = {
          enumName: 'BackedListEnum',
          values: [{
              value: 'CCB',
              label: '建设银行'
            },
            {
              value: 'ICBC',
              label: '工商银行'
            },
            {
              value: 'PINAGAN',
              label: '平安银行'
            },
            {
              value: 'ABC',
              label: '农业银行'
            },
            {
              value: 'CMB',
              label: '招商银行'
            },
            {
              value: 'PSBC',
              label: '邮储银行'
            },
            {
              value: 'CMBC',
              label: '民生银行'
            },
            {
              value: 'CEB',
              label: '光大银行'
            },
            {
              value: 'CITIC',
              label: '中信银行'
            },
            {
              value: 'CIB',
              label: '兴业银行'
            },
            {
              value: 'SPDB',
              label: '浦发银行'
            },
            {
              value: 'BOC',
              label: '中国银行'
            },
            {
              value: 'COMM',
              label: '交通银行'
            },
            {
              value: 'GDB',
              label: '广发银行'
            },
            {
              value: 'HXB',
              label: '华夏银行'
            },
            {
              value: 'BJB',
              label: '北京银行'
            },
            {
              value: 'SHB',
              label: '上海银行'
            },
          ]
        }

        /** 小米分逾期状态*/
        enumOpts[1] = {
          enumName: 'LoanCollectStatusEnum',
          values: [{
              value: 'INIT',
              label: '新增催收'
            },
            {
              value: 'FOLLOW',
              label: '已跟进'
            },
            {
              value: 'BACKED',
              label: '已还款'
            },
            {
              value: 'OUTSOURCE',
              label: '委外'
            },
          ]
        };

        /** 小米分还款状态*/
        enumOpts[2] = {
          enumName: 'LoanRemindStatusEnum',
          values: [{
              value: 'BACKING',
              label: '回款中'
            },
            {
              value: 'SETTLED',
              label: '已结清'
            },
            {
              value: 'OVERDUED',
              label: '已逾期'
            },
          ]
        };

        /** 小米分还款单状态*/
        enumOpts[3] = {
          enumName: 'LoanBackedStatusEnum',
          values: [{
              value: 'CREATED',
              label: '新创建'
            },
            {
              value: 'SUBMITED',
              label: '提交处理'
            },
            {
              value: 'FINISHED',
              label: '处理完成'
            },
          ]
        };

        /** */
        enumOpts[4] = {
          enumName: 'DutyManagementEnums',
          values: [{
              name: '财务组',
              value: 'F001'
            },
            {
              name: '提醒一组',
              value: 'T001'
            },
            {
              name: '提醒二组',
              value: 'K001'
            },
            {
              name: '营销一组',
              value: 'YX01'
            },
            {
              name: '营销二组',
              value: 'YX02'
            },
            {
              name: '营销三组',
              value: 'YX03'
            },
            {
              name: '营销四组',
              value: 'YX04'
            },
            {
              name: '昆明提醒一组',
              value: 'KMTX01'
            },
            {
              name: '昆明营销一组',
              value: 'KMYX01'
            },
            {
              name: '昆明营销二组',
              value: 'KMYX02'
            },
            {
              name: '昆明营销三组',
              value: 'KMYX03'
            },
            {
              name: '断约营销一组',
              value: 'R001'
            },
            {
              name: '断约营销二组',
              value: 'R002'
            },
            {
              name: '催收1-3',
              value: 'FOLLOW_1_3'
            },
            {
              name: '小米分催收',
              value: 'FOLLOW_XIAOMI'
            },
            {
              name: '保有花提醒',
              value: 'FOLLOW_BYH'
            },
            {
              name: '保有花催收',
              value: 'COLLECT_BYH'
            },
          ]
        };
        for (var enumOptNum in enumOpts) {
          if (enumOpts[enumOptNum].enumName == enumName) {
            return enumOpts[enumOptNum].values;
          }
        }
        return ' '
      },


    }

  }
}
export default enumUtils
