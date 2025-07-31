/**
 * 조회용 config
 */
const selectConfig = {
  gpt: {
    dashboard: {
      list: {
        url: ''
      }
    }
  },
  auth: {
    login: {
      refresh: {
        url: '/api/auth/refresh'
      },
      valid: {
        url: '/api/auth/valid'
      }
    },
    userInfo: {
      url: '/api/auth/user/info',
      depts: {
        url: '/api/auth/user/info/depts'
      },
      users: {
        url: '/api/auth/user/info/users'
      },
      vendors: {
        url: '/api/auth/user/info/vendors'
      }
    }
  },
  system: {
    lang: {
      url: '/api/system/langs'
    },
    genJson: {
      url: '/api/system/lang/json'
    }
  },
  monitor: {
    excavationTask: {
      url: '/api/monitoring/excavationTasks'
    },
    selfEvaluation: {
      url: '/api/monitoring/selfEvaluationMeasures'
    },
    safetyHealthyTarget: {
      url: '/api/monitoring/safetyHealthyTargetPerformances'
    },
    budget: {
      url: '/api/monitoring/budgetPerformance'
    },
    board: {
      url: '/api/monitoring/boardImpStatus'
    },
    oshProceeding: {
      url: '/api/monitoring/oshProceedingStatus'
    },
    vendorCouncil: {
      url: '/api/monitoring/vendorCouncilStatus'
    },
    patrolSafety: {
      url: '/api/monitoring/patrolSafetyStatus'
    },
    hazardEquipSafetyCheck: {
      url: '/api/monitoring/hazardEquipStatus'
    },
    workMeasureStatus: {
      url: '/api/monitoring/workMeasureStatus'
    },
    diagnosisUserStatus: {
      url: '/api/monitoring/diagnosisUserStatus'
    },
    chemMaterialStatus: {
      url: '/api/monitoring/chemMaterialStatus'
    },
    krasRiskYear: {
      url: '/api/monitoring/krasRiskYearStatus'
    },
    krasRiskRegistry: {
      url: '/api/monitoring/krasRiskRegistries'
    },
    educationSchedultTable: {
      url: '/api/monitoring/educationSchedultTable'
    },
    vendorEvaluationYear: {
      url: '/api/monitoring/vendorEvaluationYearStatus'
    },
    unsuitableImprStatus: {
      url: '/api/monitoring/unsuitableImprStatus'
    },
    takenActionDeptImprStatus: {
      url: '/api/monitoring/takenActionDeptImprStatus'
    }
  },
  main: {
    workPermit: {
      url: '/api/main/workPermit/map'
    },
    lawcheck: {
      url: '/api/main/law/checks'
    },
    safcon: {
      url: '/api/main/safcon'
    },
    riskAssess: {
      url: '/api/main/processAssess'
    },
    map: {
      url: '/api/main/map'
    },
    mapProcess: {
      url: '/api/main/mapProcess'
    },
    env: {
      url: '/api/main/mapPeriod/env'
    },
    imprChart: {
      url: '/api/main/impr/chart'
    },
    patrolChart: {
      url: '/api/main/patrol'
    },
    imprRequest: {
      url: '/api/main/impr/request'
    },
    imprAction: {
      url: '/api/main/impr/action'
    },
    law: {
      url: '/api/main/law'
    },
    workPermitStatus: {
      url: '/api/main/workPermit'
    },
    imprProgress: {
      url: '/api/main/impr/progress'
    },
    workProgress: {
      url: '/api/main/work/progress'
    }
  },
  com: {
    revision: {
      getversion: '/api/com/revision'
    },
    upload: {
      fileList: {
        url: '/api/com/uploadedFiles'
      },
      fileInfo: {
        url: '/api/com/uploadedFile'
      },
      preview: {
        url: '/api/com/imageToByte'
      },
      previewParamTask: {
        url: '/api/com/imageToByte/task'
      },
      fileDown: {
        url: '/api/com/fileToByte'
      },
      vodDown: {
        url: '/api/com/fileToVods'
      },
      vodDownS3: {
        url: '/api/com/fileToVod/s3'
      }
    },
    weeks: {
      list: {
        url: '/api/com/weeks'
      }
    },
    task: {
      url: '/api/com/tasks'
    },
    mobileHostname: {
      url: '/api/com/mobile/hostname'
    }
  },
  devtool: {
    dbtables: {
      url: '/api/devtool/generators'
    },
    dbtable: {
      url: '/api/devtool/generator/{0}/{1}'
    },
    erd: {
      url: '/api/devtool/convert/tableerd'
    }
  },
  psi: {
    diagramkind: {
      url: '/api/psi/diagramkinds'
    },
    diagram: {
      list: {
        url: '/api/psi/diagrams'
      },
      get: {
        url: '/api/psi/diagram/{0}'
      }
    },
    documentkind: {
      url: '/api/psi/documentkinds'
    },
    document: {
      list: {
        url: '/api/psi/documents'
      },
      get: {
        url: '/api/psi/document/{0}'
      }
    },
    hsl: {
      hazardmaterials: {
        url: '/api/psi/hsl/hazardmaterials'
      }
    },
    pfi: {
      power: {
        list: {
          url: '/api/psi/pfi/powers'
        },
        get: {
          url: '/api/psi/pfi/power/{0}'
        }
      },
      device: {
        list: {
          url: '/api/psi/pfi/devices'
        },
        get: {
          url: '/api/psi/pfi/device/{0}'
        },
        detail: {
          url: '/api/psi/pfi/device/{0}/{1}'
        }
      },
      pipegasket: {
        list: {
          url: '/api/psi/pfi/pipegaskets'
        },
        get: {
          url: '/api/psi/pfi/pipegasket/{0}'
        },
        substance: {
          list: {
            url: '/api/psi/pfi/pipegasket/substance/{0}'
          }
        }
      },
      valve: {
        list: {
          url: '/api/psi/pfi/valves'
        },
        get: {
          url: '/api/psi/pfi/valve/{0}'
        }
      }
    },
    pcd: {
      interlock: {
        list: {
          url: '/api/psi/pcd/interlocks'
        },
        get: {
          url: '/api/psi/pcd/interlock/{0}'
        }
      }
    },
    lbe: {
      fireproof: {
        list: {
          url: '/api/psi/lbe/fireproofs'
        },
        get: {
          url: '/api/psi/lbe/fireproof/{0}'
        }
      },
      fireequip: {
        list: {
          url: '/api/psi/lbe/fireequips'
        },
        get: {
          url: '/api/psi/lbe/fireequip/{0}'
        }
      },
      firedetect: {
        list: {
          url: '/api/psi/lbe/firedetects'
        },
        get: {
          url: '/api/psi/lbe/firedetect/{0}'
        }
      },
      gasalarm: {
        list: {
          url: '/api/psi/lbe/gasalarms'
        },
        get: {
          url: '/api/psi/lbe/gasalarm/{0}'
        }
      },
      localven: {
        list: {
          url: '/api/psi/lbe/localvens'
        },
        get: {
          url: '/api/psi/lbe/localven/{0}'
        }
      },
      wash: {
        list: {
          url: '/api/psi/lbe/washs'
        },
        get: {
          url: '/api/psi/lbe/wash/{0}'
        }
      },
      protect: {
        list: {
          url: '/api/psi/lbe/protects'
        },
        get: {
          url: '/api/psi/lbe/protect/{0}'
        },
        item: {
          list: {
            url: '/api/psi/lbe/protectitems/{0}'
          }
        }
      }
    }
  },
  sys: {
    language: {
      list: {
        url: '/api/system/lang/languages'
      },
      check: {
        url: '/api/system/lang/language/check'
      },
      down: {
        url: '/api/system/lang/language/down'
      },
      commcd: {
        url: '/api/system/lang/language/commcd'
      }
    },
    push: {
      specific: {
        get: {
          url: '/api/sys/push/specific/{0}'
        },
        list: {
          url: '/api/sys/push/specifics'
        }
      },
      tokenUser: {
        list: {
          url: '/api/sys/push/token/users'
        }
      },
      history: {
        list: {
          url: '/api/sys/push/histories'
        }
      }
    },
    appr: {
      type: {
        list: {
          url: '/api/sys/appr/types'
        },
        get: {
          url: '/api/sys/appr/type/{0}'
        }
      },
      line: {
        last: {
          url: '/api/sys/appr/lines/last'
        },
        list: {
          url: '/api/sys/appr/lines'
        }
      },
      list: {
        todo: {
          url: '/api/sys/appr/list/todo'
        },
        mycnt: {
          url: '/api/sys/appr/list/mycnt'
        }
      },
      info: {
        get: {
          url: '/api/sys/appr/info'
        }
      },
      transfer: {
        list: {
          url: '/api/sys/appr/transfers'
        }
      }
    },
    favorite: {
      list: {
        url: '/api/sys/favorites'
      }
    },
    log: {
      login: {
        list: {
          url: '/api/sys/log/logins'
        }
      },
      batch: {
        list: {
          url: '/api/sys/log/batches'
        }
      },
      menulog: {
        list: {
          url: '/api/sys/log/menulogs'
        }
      }
    },
    menu: {
      list: {
        url: '/api/sys/men/menus'
      },
      dashboard: {
        url: '/api/sys/men/menu/dashboards'
      },
      get: {
        url: '/api/sys/men/menu/{0}'
      }
    },
    manual: {
      get: {
        url: '/api/sys/men/manual/{0}'
      }
    },
    userMenu: {
      list: {
        url: '/api/sys/auth/user/usermenus'
      },
      get: {
        url: '/api/sys/auth/user/usermenus/'
      },
      favorites: {
        url: '/api/sys/auth/user/favorite/menu/'
      }
    },
    code: {
      domain: {
        list: {
          url: '/api/sys/code/domains'
        }
      },
      group: {
        list: {
          url: '/api/sys/code/grps/{0}'
        }
      },
      usegroup: {
        list: {
          url: '/api/sys/code/usegrps'
        }
      },
      mst: {
        list: {
          url: '/api/sys/code/msts/{0}',
          attr: {
            url: '/api/sys/code/msts/{0}/{1}'
          },
          multi: {
            url: '/api/sys/code/msts/multi'
          }
        },
        mnglist: {
          url: '/api/sys/code/mstsmng/{0}'
        },
        langlist: {
          url: '/api/sys/code/mstslang/{0}'
        },
        valid: {
          url: '/api/sys/code/msts/valid'
        },
        get: {
          url: '/api/sys/code/mst/{0}/{1}'
        }
      }
    },
    stepper: {
      grp: {
        list: {
          url: '/api/sys/stepper/grps'
        },
        get: {
          url: '/api/sys/stepper/grp/{0}'
        }
      },
      mst: {
        list: {
          url: '/api/sys/stepper/msts/{0}'
        },
        get: {
          url: '/api/sys/stepper/mst/{0}/{1}'
        }
      }
    },
    sequence: {
      list: {
        url: '/api/sys/sequences'
      },
      get: {
        url: '/api/sys/sequence/{0}'
      },
      check: {
        url: '/api/sys/sequence/check/{0}'
      }
    },
    attach: {
      list: {
        url: '/api/sys/attachsettings'
      },
      get: {
        url: '/api/sys/attachsetting/{0}'
      },
      check: {
        url: '/api/sys/attachsetting/check/{0}'
      }
    },
    excelUpload: {
      list: {
        url: '/api/sys/excelUploadSettings'
      },
      get: {
        url: '/api/sys/excelUploadSetting/{0}'
      },
      check: {
        url: '/api/sys/excelUploadSetting/check/{0}'
      },
      checkName: {
        url: '/api/sys/excelUpload/check'
      },
      template: {
        url: '/api/sys/excelUpload/template'
      }
    },
    batch: {
      list: {
        url: '/api/sys/batchsettings'
      },
      get: {
        url: '/api/sys/batchsetting/{0}'
      },
      check: {
        url: '/api/sys/batchsetting/check/{0}'
      }
    },
    env: {
      list: {
        url: '/api/sys/envs'
      },
      get: {
        url: '/api/sys/env/{0}'
      }
    },
    notice: {
      list: {
        url: '/api/sys/notices'
      },
      main: {
        url: '/api/sys/main/notices'
      },
      get: {
        url: '/api/sys/notice/{0}'
      }
    },
    defect: {
      list: {
        url: '/api/sys/defects'
      },
      get: {
        url: '/api/sys/defect'
      }
    },
    auth: {
      grp: {
        list: {
          url: '/api/sys/auth/grps'
        },
        get: {
          url: '/api/sys/auth/grp/{0}'
        }
      },
      menu: {
        list: {
          url: '/api/sys/auth/menus'
        }
      },
      dept: {
        list: {
          url: '/api/sys/auth/depts'
        }
      },
      user: {
        list: {
          url: '/api/sys/auth/users'
        }
      },
      deptauth: {
        list: {
          url: '/api/sys/auth/deptauths'
        }
      },
      userauth: {
        list: {
          url: '/api/sys/auth/userauths'
        }
      },
      plant: {
        dept: {
          list: {
            url: '/api/sys/auth/plant/depts'
          }
        },
        user: {
          list: {
            url: '/api/sys/auth/plant/users'
          }
        }
      }
    }
  },
  ram: {
    dashboard: {
      plantInfo: {
        url: '/api/ram/dashboard/plant'
      },
      processAssess: {
        url: '/api/ram/dashboard/processAssess'
      },
      hazop: {
        url: '/api/ram/dashboard/hazopHistory'
      },
      kras: {
        url: '/api/ram/dashboard/krasHistory'
      },
      kpsr: {
        url: '/api/ram/dashboard/kpsrHistory'
      },
      checklist: {
        url: '/api/ram/dashboard/checklistHistory'
      }
    },
    status: {
      riskLevel: {
        url: '/api/ram/status/riskLevels'
      },
      imprLevel: {
        url: '/api/ram/status/imprLevels'
      },
      factorList: {
        url: '/api/ram/status/factorList'
      }
    },
    safeHealSurvey: {
      list: {
        url: '/api/ram/safeHealSurvey'
      },
      print: {
        url: '/api/ram/safeHealSurvey/print'
      }
    },
    variable: {
      list: {
        url: '/api/ram/base/variables'
      },
      get: {
        url: '/api/ram/base/variable/{0}'
      }
    },
    variableCause: {
      list: {
        url: '/api/ram/base/variable/guidewords'
      }
    },
    matrix: {
      list: {
        url: '/api/ram/base/matrixs'
      },
      get: {
        url: '/api/ram/base/matrix/{0}'
      },
      risk: {
        list: {
          url: '/api/ram/base/matrix/risks'
        }
      }
    },
    riskType: {
      list: {
        url: '/api/ram/base/riskTypes'
      },
      get: {
        url: '/api/ram/base/riskType/{0}'
      }
    },
    riskTypeCause: {
      list: {
        url: '/api/ram/base/riskType/causes'
      }
    },
    riskThirdStandard: {
      list: {
        url: '/api/ram/base/riskThirdStandards'
      },
      check: {
        url: '/api/ram/base/riskThirdStandard/check'
      }
    },
    riskHazard: {
      list: {
        url: '/api/ram/base/riskHazards'
      },
      get: {
        url: '/api/ram/base/riskHazard/{0}'
      }
    },
    fmRiskHazard: {
      list: {
        url: '/api/ram/base/4mRiskHazards'
      },
      get: {
        url: '/api/ram/base/4mRiskHazard/{0}'
      }
    },
    assessPlan: {
      list: {
        url: '/api/ram/assess/plans'
      },
      get: {
        url: '/api/ram/assess/plan/{0}'
      }
    },
    assessTeam: {
      list: {
        url: '/api/ram/assess/teams'
      }
    },
    assessOccasion: {
      list: {
        url: '/api/ram/assess/occasions'
      },
      task: {
        url: '/api/ram/assess/occasion/tasks'
      }
    },
    assessConference: {
      list: {
        url: '/api/ram/assess/conferences'
      }
    },
    relatedDocument: {
      list: {
        url: '/api/ram/assess/relatedDocuments'
      },
      addData: {
        url: '/api/ram/assess/relatedDocument/addDatas'
      }
    },
    targetProcess: {
      list: {
        url: '/api/ram/assess/target/processes'
      }
    },
    drawNode: {
      list: {
        url: '/api/ram/assess/drawNodes'
      }
    },
    assessSop: {
      list: {
        url: '/api/ram/assess/sopScenarios'
      }
    },
    kpsr: {
      summary: {
        url: '/api/ram/kpsr/summary'
      },
      compare: {
        url: '/api/ram/kpsr/compare'
      },
      status: {
        url: '/api/ram/kpsr/status'
      },
      print: {
        url: '/api/ram/kpsr/print/{0}'
      },
      scenario: {
        list: {
          url: '/api/ram/kpsr/scenarios'
        }
      },
      riskReduce: {
        list: {
          url: '/api/ram/kpsr/assess/riskReduce'
        }
      }
    },
    hazop: {
      summary: {
        url: '/api/ram/hazop/summary'
      },
      compare: {
        url: '/api/ram/hazop/compare'
      },
      status: {
        url: '/api/ram/hazop/status'
      },
      print: {
        url: '/api/ram/hazop/print/{0}'
      },
      scenario: {
        list: {
          url: '/api/ram/hazop/scenarios'
        }
      },
      riskReduce: {
        list: {
          url: '/api/ram/hazop/assess/riskReduce'
        }
      }
    },
    checklist: {
      summary: {
        url: '/api/ram/checklist/summary'
      },
      compare: {
        url: '/api/ram/checklist/compare'
      },
      status: {
        url: '/api/ram/checklist/status'
      },
      print: {
        url: '/api/ram/checklist/print/{0}'
      },
      scenario: {
        list: {
          url: '/api/ram/checklist/scenarios'
        },
        get: {
          url: '/api/ram/checklist/scenario/{0}'
        }
      },
      riskReduce: {
        list: {
          url: '/api/ram/checklist/assess/riskReduce'
        },
        impr: {
          url: '/api/ram/checklist/assess/imprs'
        }
      },
      master: {
        list: {
          url: '/api/ram/checklist/masters',
          pop: {
            url: '/api/ram/checklist/pop/masters'
          }
        }
      },
      target: {
        list: {
          url: '/api/ram/assess/checklist/targets'
        },
        base: {
          url: '/api/ram/assess/checklist/base/targets'
        }
      }
    },
    jsa: {
      summary: {
        url: '/api/ram/jsa/summary'
      },
      compare: {
        url: '/api/ram/jsa/compare'
      },
      status: {
        url: '/api/ram/jsa/status'
      },
      print: {
        url: '/api/ram/jsa/print/{0}'
      },
      scenario: {
        list: {
          url: '/api/ram/jsa/scenarios'
        },
        get: {
          url: '/api/ram/jsa/scenario/{0}'
        }
      },
      riskRegister: {
        list: {
          url: '/api/ram/jsa/assess/riskRegister'
        }
      },
      riskReduce: {
        list: {
          url: '/api/ram/jsa/assess/riskReduce'
        },
        impr: {
          url: '/api/ram/jsa/assess/imprs'
        }
      }
    },
    third: {
      summary: {
        url: '/api/ram/third/summary'
      },
      compare: {
        url: '/api/ram/third/compare'
      },
      status: {
        url: '/api/ram/third/status'
      },
      print: {
        url: '/api/ram/third/print/{0}'
      },
      scenario: {
        list: {
          url: '/api/ram/third/scenarios'
        },
        get: {
          url: '/api/ram/third/scenario/{0}'
        }
      },
      riskReduce: {
        list: {
          url: '/api/ram/third/assess/riskReduce'
        },
        impr: {
          url: '/api/ram/third/assess/imprs'
        }
      }
    },
    kras: {
      summary: {
        url: '/api/ram/kras/summary'
      },
      compare: {
        url: '/api/ram/kras/compare'
      },
      status: {
        url: '/api/ram/kras/status'
      },
      print: {
        url: '/api/ram/kras/print/{0}'
      },
      scenario: {
        list: {
          url: '/api/ram/kras/scenarios'
        },
        get: {
          url: '/api/ram/kras/scenario/{0}'
        }
      },
      riskReduce: {
        list: {
          url: '/api/ram/kras/assess/riskReduce'
        },
        impr: {
          url: '/api/ram/kras/assess/imprs'
        }
      }
    },
    fm: {
      summary: {
        url: '/api/ram/4m/summary'
      },
      compare: {
        url: '/api/ram/4m/compare'
      },
      status: {
        url: '/api/ram/4m/status'
      },
      print: {
        url: '/api/ram/4m/print/{0}'
      },
      targetProcess: {
        url: '/api/ram/4m/assess/target/processes/{0}'
      },
      scenario: {
        list: {
          url: '/api/ram/4m/scenarios'
        },
        get: {
          url: '/api/ram/4m/scenario/{0}'
        }
      },
      riskReduce: {
        list: {
          url: '/api/ram/4m/assess/riskReduce'
        },
        impr: {
          url: '/api/ram/4m/assess/imprs'
        }
      },
      riskRegister: {
        list: {
          url: '/api/ram/4m/assess/riskRegister'
        }
      },
      impr: {
        list: {
          url: '/api/ram/4m/assess/riskReduce/imprs'
        },
        get: {
          url: '/api/ram/4m/assess/riskReduce/impr/{0}'
        }
      }
    },
    charm: {
      print: {
        url: '/api/ram/charm/print/{0}'
      },
      scenario: {
        result: {
          url: '/api/ram/charm/result/scenarios'
        },
        get: {
          url: '/api/ram/charm/result/scenario/{0}'
        },
        estimation: {
          url: '/api/ram/charm/estimation/scenarios'
        },
        estimationDetail: {
          url: '/api/ram/charm/estimation/scenario/{0}'
        }
      },
      riskReduce: {
        list: {
          url: '/api/ram/charm/assess/riskReduce'
        },
        impr: {
          url: '/api/ram/charm/assess/imprs'
        }
      },
      summary: {
        estimation: {
          url: '/api/ram/charm/summary/estimation'
        },
        result: {
          url: '/api/ram/charm/summary/result'
        }
      },
      compare: {
        estimation: {
          url: '/api/ram/charm/compare/estimation'
        },
        result: {
          url: '/api/ram/charm/compare/result'
        }
      },
      status: {
        url: '/api/ram/charm/status'
      }
    },
    riskRegister: {
      list: {
        url: '/api/ram/riskRegisters/assess'
      }
    }
  },
  fft: {
    base: {
      item: {
        list: {
          url: '/api/fft/base/fireFightingItems'
        }
      },
      utvItem: {
        list: {
          url: '/api/fft/base/fireFightingUtvItems'
        }
      },
      location: {
        list: {
          url: '/api/fft/base/fireFightingLocations'
        },
        get: {
          url: '/api/fft/base/fireFightingLocation/{0}'
        }
      }
    },
    fireFighting: {
      list: {
        url: '/api/fft/fireFightings'
      },
      get: {
        url: '/api/fft/fireFighting/{0}'
      },
      check: {
        url: '/api/fft/fireFighting/check'
      }
    },
    fireFightingMap: {
      list: {
        url: '/api/fft/fireFightingMaps'
      },
      get: {
        url: '/api/fft/fireFightingMap/{0}'
      }
    },
    fireFightingResultMap: {
      list: {
        url: '/api/fft/fireFightingMapEquips'
      },
      get: {
        url: '/api/fft/fireFightingMapEquip/{0}'
      }
    },
    fireFightingReceivingSetHistory: {
      list: {
        url: '/api/fft/fireFightingReceivingSetHistories'
      },
      get: {
        url: '/api/fft/fireFightingReceivingSetHistory/{0}'
      }
    },
    fireFightingPermit: {
      list: {
        url: '/api/fft/fireFightingPermits'
      },
      get: {
        url: '/api/fft/fireFightingPermit/{0}'
      },
      print: {
        url: '/api/fft/fireFightingPermit/print/{0}'
      },
      checklistItem: {
        list: {
          url: '/api/fft/base/fireFightingPermit/checklistItems'
        }
      }
    },
    fireFightingUtv: {
      list: {
        url: '/api/fft/utv/fireFightingUtvs'
      }
    },
    fireFightingDocument: {
      get: {
        url: '/api/fft/fireFightingDocument'
      }
    },
    oraganizaionUserDept: {
      list: {
        url: '/api/fft/fireFighting/oraganizaionUserDepts'
      }
    },
    fireFightingTrainingScenario: {
      list: {
        url: '/api/fft/fts/fireFightingTrainingScenarios'
      },
      get: {
        url: '/api/fft/fts/fireFightingTrainingScenario/{0}'
      }
    },
    fireFightingTraningEdu: {
      list: {
        url: '/api/fft/fte/fireFightingTraningEdus'
      },
      get: {
        url: '/api/fft/fte/fireFightingTraningEdu/{0}'
      },
      user: {
        list: {
          url: '/api/fft/fte/fireFightingTraningEduUsers'
        }
      },
      scenario: {
        list: {
          url: '/api/fft/fte/fireFightingTraningEduScenarioResults'
        }
      }
    },
    fireFightingTraningEduYear: {
      list: {
        url: '/api/fft/fte/fireFightingTraningEduYears'
      },
      get: {
        url: '/api/fft/fte/fireFightingTraningEduYear/{0}'
      }
    },
    fireFightingUtvCheck: {
      list: {
        url: '/api/fft/utv/fireFightingUtvChecks'
      },
      get: {
        url: '/api/fft/utv/fireFightingUtvCheck/{0}'
      }
    },
    fireFightingLegalCheck: {
      list: {
        url: '/api/fft/fireFightingLegalChecks'
      },
      get: {
        url: '/api/fft/fireFightingLegalCheck/{0}'
      }
    },
    fireFightingIssueCheck: {
      list: {
        url: '/api/fft/ise/fireFightingIssueChecks'
      },
      get: {
        url: '/api/fft/ise/fireFightingIssueCheck/{0}'
      },
      getFireFighting: {
        url: '/api/fft/ise/fireFightingIssueCheck/fireFighting/{0}'
      },
      target: {
        get: {
          url: '/api/fft/ise/fireFightingIssueCheckTarget/{0}'
        }
      },
      status: {
        url: '/api/fft/ise/fireFightingIssueCheck/status'
      }
    },
    fireFightingCheck: {
      list: {
        url: '/api/fft/fireFightingChecks'
      },
      get: {
        url: '/api/fft/fireFightingCheck/{0}'
      },
      impr: {
        url: '/api/fft/fireFightingCheck/imprs'
      },
      imprs: {
        url: '/api/fft/fireFightingChecks/imprs'
      }
    },
    fireFightingJournal: {
      list: {
        url: '/api/fft/fireFighting/journals'
      },
      get: {
        url: '/api/fft/fireFighting/journal/{0}'
      }
    },
    fireFightingPerformanceResult: {
      list: {
        url: '/api/fft/fireFighting/performanceResults'
      },
      get: {
        url: '/api/fft/fireFighting/performanceResult/{0}'
      }
    },
    selfDefenseFireBrigade: {
      list: {
        url: '/api/fft/selfDefenseFireBrigades'
      },
      get: {
        url: '/api/fft/selfDefenseFireBrigade/{0}'
      }
    }
  },
  sop: {
    heq: {
      inspectitem: {
        list: {
          url: '/api/sop/heq/type/inspectitems'
        }
      },
      forkLift: {
        check: {
          url: '/api/sop/heq/forkLift/check'
        },
        list: {
          url: '/api/sop/heq/forkLifts'
        },
        get: {
          url: '/api/sop/heq/forkLift/{0}'
        },
        result: {
          get: {
            url: '/api/sop/heq/forkLift/result/{0}'
          }
        }
      }
    },
    pwc: {
      class: {
        list: {
          url: '/api/sop/pwc/preWorkCheckClasses'
        }
      },
      item: {
        list: {
          url: '/api/sop/pwc/preWorkCheckItems'
        }
      },
      check: {
        list: {
          url: '/api/sop/pwc/preWorkChecks'
        },
        get: {
          url: '/api/sop/pwc/preWorkCheck/{0}'
        }
      }
    },
    eme: {
      contact: {
        check: {
          url: '/api/sop/eme/contact/check/{0}'
        },
        list: {
          url: '/api/sop/eme/contact/msts'
        },
        get: {
          url: '/api/sop/eme/contact/mst'
        },
        networks: {
          url: '/api/sop/eme/contact/networks'
        }
      }
    },
    scm: {
      construction: {
        list: {
          url: '/api/sop/scm/constructions'
        },
        get: {
          url: '/api/sop/scm/construction/{0}'
        }
      }
    },
    lim: {
      lincense: {
        kind: {
          list: {
            url: '/api/sop/lim/licensekinds'
          },
          get: {
            url: '/api/sop/lim/licensekind/{0}'
          }
        },
        request: {
          list: {
            url: '/api/sop/lim/license/requests'
          },
          get: {
            url: '/api/sop/lim/license/request/{0}'
          }
        },
        review: {
          list: {
            url: '/api/sop/lim/license/reviews'
          },
          get: {
            url: '/api/sop/lim/license/review/{0}'
          }
        },
        card: {
          list: {
            url: '/api/sop/lim/license/cards'
          },
          get: {
            url: '/api/sop/lim/license/card/{0}'
          }
        },
        equipment: {
          list: {
            url: '/api/sop/lim/license/equipment/{0}'
          }
        },
        material: {
          list: {
            url: '/api/sop/lim/license/material/{0}'
          }
        }
      }
    },
    ibm: {
      improve: {
        others: {
          url: '/api/sop/ibm/improvement/others'
        },
        list: {
          url: '/api/sop/ibm/improvements'
        },
        get: {
          url: '/api/sop/ibm/improvement/{0}'
        },
        relationTask: {
          get: {
            url: '/api/sop/ibm/improvement/relationTask/{0}'
          }
        },
        supple: {
          list: {
            url: '/api/sop/ibm/supple/improvements'
          }
        },
        status: {
          list: {
            url: '/api/sop/ibm/improvement/status'
          },
          task: {
            url: '/api/sop/ibm/improvement/task/status'
          },
          requestDept: {
            url: '/api/sop/ibm/improvement/requestDept/status'
          }
        },
        print: {
          url: '/api/sop/ibm/improvement/print'
        }
      },
      immediate: {
        get: {
          url: '/api/sop/ibm/immediate/{0}'
        }
      }
    },
    psr: {
      checkItem: {
        list: {
          url: '/api/sop/psr/prestartup/checkItems'
        },
        get: {
          url: '/api/sop/psr/prestartup/checkItem/{0}'
        }
      },
      check: {
        list: {
          url: '/api/sop/psr/prestartupChecks'
        },
        get: {
          url: '/api/sop/psr/prestartupCheck/{0}'
        },
        checkTypeItemList: {
          url: '/api/sop/psr/prestartupCheck/checkType/items'
        },
        equips: {
          url: '/api/sop/psr/prestartupCheck/equipments'
        },
        checklistPrint: {
          url: '/api/sop/psr/prestartup/checklistPrint/{0}'
        },
        checklistReportPrint: {
          url: '/api/sop/psr/prestartup/checklistReportPrint/{0}'
        }
      },
      checkItemImprove: {
        list: {
          url: '/api/sop/psr/prestartup/improves'
        }
      }
    },
    swp: {
      workChekItem: {
        list: {
          url: '/api/sop/swp/checkItems'
        }
      },
      gas: {
        list: {
          url: '/api/sop/swp/gases'
        }
      },
      map: {
        list: {
          url: '/api/sop/swp/maps'
        },
        get: {
          url: '/api/sop/swp/map/{0}'
        },
        recent: {
          url: '/api/sop/swp/map/recent'
        }
      },
      workPermit: {
        list: {
          url: '/api/sop/swp/workPermits'
        },
        get: {
          url: '/api/sop/swp/workPermit/{0}'
        },
        recent: {
          url: '/api/sop/swp/workPermit/recent'
        },
        print: {
          url: '/api/sop/swp/workPermit/print/{0}'
        },
        state: {
          url: '/api/sop/swp/workPermitState'
        },
        workMap: {
          url: '/api/sop/swp/workPermit/state/maps'
        },
        graph: {
          normal: {
            url: '/api/sop/swp/workPermit/graph/normal'
          },
          supplement: {
            url: '/api/sop/swp/workPermit/graph/sup'
          }
        }
      }
    },
    moc: {
      change: {
        list: {
          url: '/api/sop/moc/mocs'
        },
        get: {
          url: '/api/sop/moc/moc/{0}'
        },
        status: {
          url: '/api/sop/moc/mocStatus'
        },
        judgeCheckList: {
          base: {
            url: '/api/sop/moc/moc/judgeCheckList/base'
          },
          get: {
            url: '/api/sop/moc/moc/judgeCheckList/{0}'
          }
        },
        initiative: {
          get: {
            url: '/api/sop/moc/moc/initiative/{0}'
          }
        },
        review: {
          get: {
            url: '/api/sop/moc/moc/review/{0}'
          }
        },
        committee: {
          list: {
            url: '/api/sop/moc/moc/committees'
          }
        },
        reviewItem: {
          list: {
            url: '/api/sop/moc/moc/committee/reviewItems'
          }
        },
        action: {
          get: {
            url: '/api/sop/moc/moc/action/{0}'
          }
        },
        punchList: {
          get: {
            url: '/api/sop/moc/moc/punchList/{0}'
          }
        },
        emergency: {
          initiative: {
            get: {
              url: '/api/sop/moc/moc/emergency/initiative/{0}'
            }
          }
        },
        approvalFlag: {
          get: {
            url: '/api/sop/moc/moc/approvalFlag/{0}'
          }
        }
      },
      relationEquip: {
        list: {
          url: '/api/sop/moc/relation/equipment/mocs/{0}'
        }
      },
      relationWorkDocu: {
        case1: {
          list: {
            url: '/api/sop/moc/relationWork/documentPSI'
          }
        },
        case2: {
          list: {
            url: '/api/sop/moc/relationWork/documentRSA'
          }
        },
        case3: {
          list: {
            url: '/api/sop/moc/relationWork/documentEDU'
          }
        },
        case4: {
          list: {
            url: '/api/sop/moc/relationWork/documentPSR'
          }
        },
        case5: {
          list: {
            url: '/api/sop/moc/relationWork/documentSWP'
          }
        },
        case6: {
          list: {
            url: '/api/sop/moc/relationWork/documentLIC'
          }
        }
      },
      determination: {
        list: {
          url: '/api/sop/moc/determination/checklists'
        }
      }
    },
    min: {
      equipment: {
        annual: {
          list: {
            url: '/api/sop/min/equipment/annual'
          },
          get: {
            url: '/api/sop/min/equipment/annual/{0}/{1}'
          }
        },
        plan: {
          daily: {
            list: {
              url: '/api/sop/min/equipment/daily/plans'
            },
            get: {
              url: '/api/sop/min/equipment/daily/plan/{0}'
            },
            improve: {
              url: '/api/sop/min/equipment/daily/plan/improves'
            }
          },
          list: {
            url: '/api/sop/min/equipment/plans'
          },
          get: {
            url: '/api/sop/min/equipment/plan/{0}'
          }
        },
        result: {
          daily: {
            list: {
              url: '/api/sop/min/equipment/daily/results'
            },
            newItem: {
              url: '/api/sop/min/equipment/daily/new/result/{0}'
            },
            utilityItem: {
              url: '/api/sop/min/equipment/daily/utility/result/{0}'
            }
          },
          list: {
            url: '/api/sop/min/equipment/results'
          },
          item: {
            get: {
              url: '/api/sop/min/equipment/result/items/{0}/{1}'
            }
          },
          lunar: {
            url: '/api/sop/min/equipment/lunar/{0}'
          }
        },
        checkCycle: {
          list: {
            url: '/api/sop/min/equipment/checkcycle'
          },
          print: {
            url: '/api/sop/min/equipment/checkcycle/print'
          }
        },
        maintain: {
          list: {
            url: '/api/sop/min/equipment/maintain/maintains'
          },
          getYear: {
            url: '/api/sop/min/equipment/maintain/maintain/year'
          },
          print: {
            url: '/api/sop/min/equipment/maintain/maintain/print'
          },
          print2: {
            url: '/api/sop/min/equipment/maintain/maintain/print2'
          }
        },
        improve: {
          get: {
            url: '/api/sop/min/equipment/improve'
          }
        }
      },
      maintenance: {
        plan: {
          list: {
            url: '/api/sop/min/maintenance/plans'
          },
          get: {
            url: '/api/sop/min/maintenance/plan/{0}'
          }
        },
        result: {
          list: {
            url: '/api/sop/min/maintenance/results'
          }
        }
      }
    },
    safetycheck: {
      item: {
        list: {
          url: '/api/sop/min/smd/safetycheck/items'
        }
      },
      plan: {
        list: {
          url: '/api/sop/min/smd/safetycheck/plans'
        },
        get: {
          url: '/api/sop/min/smd/safetycheck/plan/{0}'
        }
      },
      result: {
        newItem: {
          url: '/api/sop/min/smd/safetycheck/result/new'
        }
      },
      improve: {
        get: {
          url: '/api/sop/min/smd/safetycheck/improves'
        }
      },
      status: {
        list: {
          url: '/api/sop/min/smd/safetycheck/status'
        }
      }
    },
    hhm: {
      hazard: {
        check: {
          list: {
            url: '/api/sop/hhm/hazard/equipments'
          },
          get: {
            url: '/api/sop/hhm/hazard/equipment/{0}'
          },
          check: {
            url: '/api/sop/hhm/hazard/equipment/check'
          }
        },
        hazardMap: {
          list: {
            url: '/api/sop/hhm/hazard/equipment/maps'
          }
        },
        hazardHistory: {
          get: {
            url: '/api/sop/hhm/hazard/equipment/history/{0}'
          },
          result: {
            get: {
              url: '/api/sop/hhm/hazard/equipment/history/result/{0}/{1}'
            }
          }
        },
        hazardImprove: {
          get: {
            url: '/api/sop/hhm/hazard/equipment/improve/{0}/{1}'
          }
        },
        inspection: {
          target: {
            list: {
              url: '/api/sop/hhm/hazard/equipment/inspection/targets'
            }
          },
          item: {
            list: {
              url: '/api/sop/hhm/hazard/equipment/inspection/item'
            }
          }
        },
        history: {
          list: {
            url: '/api/sop/hhm/hazard/equipment/inspection/histories'
          },
          get: {
            url: '/api/sop/hhm/hazard/equipment/inspection/history/{0}'
          },
          newitem: {
            url: '/api/sop/hhm/hazard/equipment/inspection/history/newitem'
          }
        }
      }
    },
    edu: {
      course: {
        list: {
          url: '/api/sop/edu/course/infos'
        },
        get: {
          url: '/api/sop/edu/course/info/{0}'
        },
        check: {
          url: '/api/sop/edu/course/info/check/{0}/{1}/{2}'
        },
        multilist: {
          url: '/api/sop/edu/course/multi/infos/{0}'
        },
        userlist: {
          url: '/api/sop/edu/course/info/users'
        },
        deptlist: {
          url: '/api/sop/edu/course/info/depts'
        },
        seniorlist: {
          url: '/api/sop/edu/course/info/seniors'
        },
        targetlist: {
          url: '/api/sop/edu/course/attendee/users'
        }
      },
      attendee: {
        get: {
          url: '/api/sop/edu/course/attendees/{0}'
        }
      },
      yearEdu: {
        get: {
          url: '/api/sop/edu/annual/yearEdu/{0}/{1}'
        }
      },
      annual: {
        list: {
          url: '/api/sop/edu/annual/plans'
        },
        get: {
          url: '/api/sop/edu/annual/plan/years'
        },
        trend: {
          list: {
            url: '/api/sop/edu/annual/trend'
          },
          get: {
            url: '/api/sop/edu/annual/trend/data'
          }
        },
        trendgraph: {
          list: {
            url: '/api/sop/edu/annual/trend/graphs'
          },
          get: {
            url: '/api/sop/edu/annual/trend/graph/{0}/{1}'
          }
        }
      },
      result: {
        list: {
          url: '/api/sop/edu/results'
        },
        count: {
          url: '/api/sop/edu/results/count/{0}'
        },
        vods: {
          url: '/api/sop/edu/results/vods'
        },
        get: {
          url: '/api/sop/edu/result/{0}',
          targetUser: {
            url: '/api/sop/edu/result/targetuser/{0}'
          },
          mobile: {
            url: '/api/sop/edu/result/mobile/{0}/{1}'
          },
          pcvod: {
            url: '/api/sop/edu/result'
          }
        },
        print: {
          result: {
            url: '/api/sop/edu/result/print'
          },
          targetUser: {
            url: '/api/sop/edu/result/print/targetuser'
          },
          courseByTargetUser: {
            url: '/api/sop/edu/result/print/courseBy/targetuser'
          }
        },
        fireJournal: {
          contents: {
            url: '/api/sop/edu/fire/journalContents'
          }
        },
        firePerformanceResultRecord: {
          contents: {
            url: '/api/sop/edu/fire/performanceResultRecord'
          }
        }
      },
      user: {
        list: {
          url: '/api/sop/edu/users'
        }
      },
      target: {
        users: {
          url: '/api/sop/edu/targetusers'
        }
      },
      arrivaldate: {
        list: {
          url: '/api/sop/edu/arrivaldate/users'
        }
      },
      vod: {
        list: {
          url: '/api/sop/edu/attendee/vods'
        },
        get: {
          url: '/api/sop/edu/attendee/vod'
        }
      },
      quiz: {
        sets: {
          get: {
            url: '/api/sop/edu/quiz/sets'
          }
        },
        mst: {
          list: {
            url: '/api/sop/edu/quiz/msts'
          },
          get: {
            url: '/api/sop/edu/quiz/mst/{0}'
          }
        },
        question: {
          list: {
            url: '/api/sop/edu/quiz/questions'
          }
        },
        answer: {
          list: {
            url: '/api/sop/edu/quiz/answers'
          }
        }
      }
    },
    iim: {
      occurForm: {
        list: {
          url: '/api/sop/iim/occur/forms'
        },
        get: {
          url: '/api/sop/iim/occur/form/{0}'
        }
      },
      accident: {
        near: {
          list: {
            url: '/api/sop/iim/accident/nears'
          },
          get: {
            url: '/api/sop/iim/accident/near/{0}'
          },
          prevention: {
            get: {
              url: '/api/sop/iim/accident/near/prevention/{0}'
            }
          },
          status: {
            bounty: {
              url: '/api/sop/iim/accident/near/status/bounty'
            },
            year: {
              url: '/api/sop/iim/accident/near/status/year'
            },
            kind: {
              url: '/api/sop/iim/accident/near/status/kind'
            },
            state: {
              url: '/api/sop/iim/accident/near/status/state'
            },
            statedetail: {
              url: '/api/sop/iim/accident/near/status/statedetail'
            },
            form: {
              large: {
                url: '/api/sop/iim/accident/near/status/form/large'
              },
              small: {
                url: '/api/sop/iim/accident/near/status/form/small'
              }
            }
          },
          examine: {
            get: {
              url: '/api/sop/iim/accident/near/examine/{0}'
            }
          }
        },
        process: {
          list: {
            url: '/api/sop/iim/accident/processes'
          },
          investigation: {
            get: {
              url: '/api/sop/iim/accident/process/investigation/{0}'
            },
            victim: {
              get: {
                url: '/api/sop/iim/accident/process/investigation/victim/{0}'
              }
            }
          },
          prevention: {
            get: {
              url: '/api/sop/iim/accident/process/prevention/{0}'
            }
          },
          get: {
            url: '/api/sop/iim/accident/process/{0}'
          },
          reportTab: {
            get: {
              url: '/api/sop/iim/accident/process/reporttab/{0}'
            }
          }
        },
        report: {
          get: {
            url: '/api/sop/iim/accident/process/report/{0}'
          },
          print: {
            url: '/api/sop/iim/accident/process/print/{0}'
          }
        },
        status: {
          year: {
            url: '/api/sop/iim/accident/status/year',
            dept: {
              url: '/api/sop/iim/accident/status/dept/year'
            }
          },
          hour: {
            url: '/api/sop/iim/accident/status/hour'
          },
          season: {
            url: '/api/sop/iim/accident/status/season'
          },
          kind1: {
            url: '/api/sop/iim/accident/status/kind1'
          },
          kind2: {
            url: '/api/sop/iim/accident/status/kind2'
          }
        }
      }
    },
    eap: {
      emergTraining: {
        list: {
          url: '/api/sop/eap/trainings'
        },
        get: {
          url: '/api/sop/eap/training/{0}'
        },
        getEval: {
          url: '/api/sop/eap/evalItems/{0}'
        }
      },
      planResult: {
        plan: {
          list: {
            url: '/api/sop/eap/plans'
          },
          get: {
            url: '/api/sop/eap/plan/{0}'
          }
        },
        result: {
          get: {
            url: '/api/sop/eap/result/{0}'
          }
        }
      },
      base: {
        list: {
          url: '/api/sop/eap/eval/items'
        }
      },
      relation: {
        list: {
          url: '/api/sop/eap/eval/relations'
        }
      },
      planDocu: {
        list: {
          url: '/api/sop/eap/plan/docus',
          pop: {
            url: '/api/sop/eap/plan/pop/docus'
          }
        },
        get: {
          url: '/api/sop/eap/plan/docu/{0}'
        }
      },
      scenario: {
        list: {
          url: '/api/sop/eap/plan/scenarios'
        },
        get: {
          url: '/api/sop/eap/plan/scenario/{0}'
        },
        rev: {
          url: '/api/sop/eap/plan/scenario/revs/{0}',
          get: {
            url: '/api/sop/eap/plan/scenario/rev/{0}/{1}'
          }
        }
      },
      training: {
        plan: {
          list: {
            url: '/api/sop/eap/training/plans'
          },
          closedList: {
            url: '/api/sop/eap/training/closed/plans'
          },
          get: {
            url: '/api/sop/eap/training/plan/{0}'
          },
          getItem: {
            url: '/api/sop/eap/training/plan/items'
          },
          status: {
            url: '/api/sop/eap/training/status'
          }
        },
        fireJournal: {
          contents: {
            url: '/api/sop/eap/training/fire/journalContents'
          }
        },
        firePerformanceResultRecord: {
          contents: {
            url: '/api/sop/eap/training/fire/performanceResultRecord'
          }
        }
      }
    },
    opm: {
      folder: {
        list: {
          url: '/api/sop/opm/folders'
        },
        get: {
          url: '/api/sop/opm/folder/{0}'
        }
      },
      folderDetail: {
        list: {
          url: '/api/sop/opm/folder/details/{0}'
        },
        get: {
          url: '/api/sop/opm/folder/detail/{0}'
        },
        rev: {
          url: '/api/sop/opm/folder/detail/revs',
          get: {
            url: '/api/sop/opm/folder/detail/rev/{0}'
          }
        }
      },
      guidebook: {
        list: {
          url: '/api/sop/opm/guidebooks'
        },
        get: {
          url: '/api/sop/opm/guidebook/{0}'
        },
        rev: {
          url: '/api/sop/opm/guidebook/revs',
          get: {
            url: '/api/sop/opm/guidebook/rev/{0}'
          }
        }
      }
    },
    cto: {
      list: {
        url: '/api/sop/bho/ctos'
      },
      get: {
        url: '/api/sop/bho/cto/{0}'
      },
      checklist: {
        list: {
          url: '/api/sop/bho/cto/improve'
        }
      },
      stdchecklist: {
        list: {
          url: '/api/sop/cto/std/checklists'
        }
      }
    },
    pca: {
      improve: {
        list: {
          url: '/api/sop/pca/improves'
        }
      },
      items: {
        all: {
          url: '/api/sop/pca/items/all'
        },
        mst: {
          url: '/api/sop/pca/items/mst'
        }
      },
      itemsresult: {
        all: {
          url: '/api/sop/pca/items/all/result'
        },
        mst: {
          url: '/api/sop/pca/items/mst/result'
        }
      },
      item: {
        revs: {
          url: '/api/sop/pca/items/revs',
          result: '/api/sop/pca/items/revs/result',
          all: '/api/sop/pca/items/all/result',
          item: '/api/sop/pca/items/revs/item'
        },
        list: {
          url: '/api/sop/pca/items'
        }
      },
      type: {
        list: {
          url: '/api/sop/pca/item/types'
        }
      },
      typeitem: {
        list: {
          url: '/api/sop/pca/item/type/items'
        }
      },
      result: {
        info: {
          list: {
            url: '/api/sop/pca/results'
          },
          get: {
            url: '/api/sop/pca/result'
          }
        },
        process: {
          list: {
            url: '/api/sop/pca/result/process'
          }
        },
        equipment: {
          list: {
            url: '/api/sop/pca/result/equipment'
          }
        },
        dept: {
          list: {
            url: '/api/sop/pca/result/dept'
          }
        },
        exec: {
          list: {
            url: '/api/sop/pca/result/exec'
          }
        },
        org: {
          list: {
            url: '/api/sop/pca/result/org'
          }
        },
        graph: {
          list: {
            url: '/api/sop/pca/result/graph'
          }
        }
      }
    },
    sas: {
      safetyGear: {
        list: {
          url: '/api/sop/sas/safety/gears'
        }
      },
      request: {
        list: {
          url: '/api/sop/sas/safety/gear/request/gives'
        },
        get: {
          url: '/api/sop/sas/safety/gear/request/{0}'
        }
      },
      give: {
        get: {
          url: '/api/sop/sas/safety/gear/give/{0}'
        },
        status: {
          url: '/api/sop/sas/safety/gear/give/status'
        }
      },
      buy: {
        list: {
          url: '/api/sop/sas/safety/gear/buy/requests'
        },
        get: {
          url: '/api/sop/sas/safety/gear/buy/request/{0}'
        }
      },
      recepit: {
        list: {
          url: '/api/sop/sas/safety/gear/recepits'
        },
        get: {
          url: '/api/sop/sas/safety/gear/recepit/{0}'
        }
      },
      stock: {
        status: {
          url: '/api/sop/sas/safety/gear/stock/status'
        },
        adjust: {
          url: '/api/sop/sas/safety/gear/stock/adjust'
        }
      }
    }
  },
  mdm: {
    cal: {
      mst: {
        list: {
          url: '/api/mdm/cal/msts'
        },
        get: {
          url: '/api/mdm/cal/mst'
        }
      },
      schedule: {
        list: {
          url: '/api/mdm/cal/schedules'
        },
        get: {
          url: '/api/mdm/cal/schedule'
        }
      }
    },
    costcenter: {
      list: {
        url: '/api/mdm/cost/centers'
      },
      get: {
        url: '/api/mdm/cost/center'
      }
    },
    sws: {
      mst: {
        list: {
          url: '/api/mdm/sws/swss'
        },
        get: {
          url: '/api/mdm/sws/sws'
        },
        copy: {
          url: '/api/mdm/sws/sws/copy'
        }
      },
      work: {
        list: {
          url: '/api/mdm/sws/works'
        },
        get: {
          url: '/api/mdm/sws/work'
        }
      },
      equip: {
        list: {
          url: '/api/mdm/sws/equips'
        }
      },
      cost: {
        list: {
          url: '/api/mdm/sws/costs'
        }
      },
      material: {
        list: {
          url: '/api/mdm/sws/materials'
        }
      },
      service: {
        list: {
          url: '/api/mdm/sws/services'
        }
      },
      tool: {
        list: {
          url: '/api/mdm/sws/tools'
        }
      },
      worker: {
        list: {
          url: '/api/mdm/sws/workers'
        }
      }
    },
    kora: {
      document: {
        list: {
          url: '/api/mdm/kora/documents'
        },
        get: {
          url: '/api/mdm/kora/document'
        }
      }
    },
    ghs: {
      nation: {
        list: '/api/mdm/ghs/nations'
      },
      mix: {
        list: '/api/mdm/ghs/mixs'
      },
      db: {
        list: '/api/mdm/ghs/dbs'
      }
    },
    company: {
      list: {
        url: '/api/mdm/cpy/companies'
      },
      get: {
        url: '/api/mdm/cpy/company/{0}'
      }
    },
    plant: {
      list: {
        url: '/api/mdm/cpy/plants'
      },
      get: {
        url: '/api/mdm/cpy/plant/{0}'
      }
    },
    deptmanager: {
      list: {
        url: '/api/mdm/dept/managers'
      }
    },
    law: {
      list: {
        url: '/api/mdm/law/laws'
      }
    },
    lawManager: {
      list: {
        url: '/api/mdm/law/lawManagers'
      }
    },
    cim: {
      vendor: {
        list: {
          url: '/api/mdm/cim/vendors'
        },
        get: {
          url: '/api/mdm/cim/vendor/{0}'
        },
        check: {
          url: '/api/mdm/cim/vendor/check/{0}'
        },
        user: {
          list: {
            url: '/api/mdm/cim/vendorusers'
          }
        },
        item: {
          list: {
            url: '/api/mdm/cim/vendoreval/items'
          }
        },
        type: {
          list: {
            url: '/api/mdm/cim/vendoreval/types'
          }
        },
        attach: {
          list: {
            url: '/api/mdm/cim/vendor/attacies'
          }
        },
        evaluation: {
          result: {
            list: {
              url: '/api/mdm/cim/vendoreval/results'
            },
            get: {
              url: '/api/mdm/cim/vendoreval/result/{0}'
            },
            item: {
              url: '/api/mdm/cim/vendoreval/base/resultitems'
            },
            user: {
              url: '/api/mdm/cim/vendoreval/resultusers'
            },
            history: {
              url: '/api/mdm/cim/vendoreval/resulthistory'
            }
          }
        },
        council: {
          list: {
            url: '/api/sop/vendor/councils'
          },
          get: {
            url: '/api/sop/vendor/council/{0}'
          }
        }
      }
    },
    mam: {
      review: {
        list: {
          url: '/api/mdm/mam/chem/reviews'
        },
        get: {
          url: '/api/mdm/mam/chem/review/{0}'
        },
        valid: {
          url: '/api/mdm/mam/chem/review/valid'
        },
        substance: {
          list: {
            url: '/api/mdm/mam/chem/review/substances'
          }
        },
        regul: {
          list: {
            url: '/api/mdm/mam/chem/review/reguls'
          },
          calcul: {
            url: '/api/mdm/mam/chem/review/regul/calcul'
          }
        },
        check: {
          list: {
            url: '/api/mdm/mam/chem/review/checks'
          }
        },
        quantity: {
          list: {
            url: '/api/mdm/mam/chem/review/subRegulQuantities'
          }
        },
        verification: {
          url: '/api/mdm/mam/chem/review/materialRegul/verification'
        }
      },
      material: {
        list: {
          url: '/api/mdm/mam/materials'
        },
        get: {
          url: '/api/mdm/mam/material/{0}'
        },
        check: {
          url: '/api/mdm/mam/material/check/{0}'
        },
        type: {
          list: {
            url: '/api/mdm/mam/materialtypes'
          },
          get: {
            url: '/api/mdm/mam/materialtype'
          },
          name: {
            url: '/api/mdm/mam/materialtype/{0}'
          }
        }
      },
      chem: {
        listreg: {
          url: '/api/mdm/mam/chemregs'
        },
        list: {
          url: '/api/mdm/mam/chem/materials'
        },
        get: {
          url: '/api/mdm/mam/chem/material/{0}'
        },
        harmfulList: {
          url: '/api/mdm/mam/chem/material/harmfulRisks'
        },
        harmfulLegendList: {
          url: '/api/mdm/mam/chem/material/harmfulRisk/legend'
        },
        msdsUnit: {
          rev: {
            url: '/api/mdm/mam/chem/material/msds/revs'
          },
          get: {
            url: '/api/mdm/mam/chem/material/msds/{0}'
          }
        },
        print: {
          url: '/api/mdm/mam/chem/material/print/warning/{0}'
        },
        regulate: {
          url: '/api/mdm/mam/chem/regulate/{0}'
        },
        header: {
          url: '/api/mdm/mam/chem/header',
          value: {
            url: '/api/mdm/mam/chem/header/vals'
          }
        },
        check: {
          url: '/api/mdm/mam/chem/check/material'
        },
        regs: {
          url: '/api/mdm/mam/chem/regs'
        },
        dept: {
          url: '/api/mdm/mam/chem/depts'
        },
        process: {
          url: '/api/mdm/mam/chem/processs'
        },
        byprocess: {
          url: '/api/mdm/mam/chem/byprocess'
        },
        substance: {
          regulate: {
            url: '/api/mdm/mam/chem/substance/regulate'
          },
          url: '/api/mdm/mam/chem/substances'
        },
        factor: {
          regulate: {
            url: '/api/mdm/mam/chem/factor/regulate'
          },
          url: '/api/mdm/mam/chem/substances'
        },
        hazard: {
          url: '/api/mdm/mam/chem/hazard'
        },
        license: {
          url: '/api/mdm/mam/chem/license'
        },
        msds: {
          url: '/api/mdm/mam/chem/msds'
        },
        hazardChem: {
          url: '/api/mdm/mam/chem/hazardChems'
        },
        quantity: {
          list: {
            url: '/api/mdm/mam/chem/subRegulQuantities'
          }
        },
        materialRegul: {
          list: {
            url: '/api/mdm/mam/chem/materialReguls'
          },
          verification: {
            url: '/api/mdm/mam/chem/materialRegul/verification'
          }
        }
      },
      regulation: {
        item: {
          list: {
            url: '/api/mdm/mam/regulation/items'
          },
          get: {
            url: '/api/mdm/mam/regulation/item/{0}'
          }
        }
      }
    },
    sop: {
      job: {
        list: {
          url: '/api/mdm/sop/sops'
        },
        get: {
          url: '/api/mdm/sop/sop/{0}'
        },
        revList: {
          url: '/api/mdm/sop/sop/revs'
        }
      },
      step: {
        list: {
          url: '/api/mdm/sop/steps'
        },
        get: {
          url: '/api/mdm/sop/step/{0}'
        }
      },
      hazardFactor: {
        list: {
          url: '/api/mdm/sop/hazardFactors'
        }
      },
      jobstep: {
        url: '/api/mdm/sop/sopsteps'
      },
      jobhazard: {
        url: '/api/mdm/sop/sophazards'
      },
      jobhazardreason: {
        url: '/api/mdm/sop/sophazardreasons'
      },
      processHazard: {
        url: '/api/mdm/sop/sopprocesshazards'
      },
      processHazardReason: {
        url: '/api/mdm/sop/sopprocesshazardreasons'
      },
      sopHazard: {
        url: '/api/mdm/sop/processsophazard'
      },
      sopStepHazard: {
        url: '/api/mdm/sop/sopStepHazards'
      },
      mm: {
        list: {
          url: '/api/mdm/sop/mms'
        }
      },
      chems: {
        list: {
          url: '/api/mdm/sop/chems'
        }
      }
    },
    user: {
      list: {
        url: '/api/mdm/hrm/users'
      },
      get: {
        url: '/api/mdm/hrm/user/{0}'
      },
      check: {
        loginid: {
          url: '/api/mdm/hrm/user/check/loginid'
        }
      },
      cycle: {
        list: {
          url: '/api/mdm/hrm/user/cycles'
        }
      }
    },
    dept: {
      list: {
        url: '/api/mdm/dim/depts'
      },
      get: {
        url: '/api/mdm/dim/dept/{0}'
      },
      check: {
        url: '/api/mdm/dim/dept/check/{0}'
      }
    },
    process: {
      list: {
        url: '/api/mdm/pim/processes'
      },
      get: {
        url: '/api/mdm/pim/process/{0}'
      },
      nameget: {
        url: '/api/mdm/pim/processnames/{0}'
      },
      check: {
        url: '/api/mdm/pim/process/check/{0}'
      },
      uplist: {
        url: '/api/mdm/pim/upprocesses'
      }
    },
    equipment: {
      list: {
        url: '/api/mdm/fim/equipments'
      },
      get: {
        url: '/api/mdm/fim/equipment/{0}'
      },
      check: {
        url: '/api/mdm/fim/equipment/check/{0}'
      },
      spec: {
        list: {
          url: '/api/mdm/fim/equipment/specs'
        }
      },
      material: {
        list: {
          url: '/api/mdm/fim/equipment/materials'
        }
      },
      rank: {
        list: {
          url: '/api/mdm/fim/equipment/ranks'
        },
        get: {
          url: '/api/mdm/fim/equipment/rank'
        }
      },
      class: {
        list: {
          url: '/api/mdm/equipment/classess'
        },
        name: {
          url: '/api/mdm/equipment/classname/{0}'
        },
        get: {
          url: '/api/mdm/equipment/class/{0}/{1}'
        },
        check: {
          url: '/api/mdm/equipment/class/check/{0}/{1}'
        },
        insItem: {
          list: {
            url: '/api/mdm/equipment/class/insitems/{0}/{1}'
          }
        },
        infoItem: {
          list: {
            url: '/api/mdm/equipment/class/infoitems'
          }
        },
        item: {
          daily: {
            list: {
              url: '/api/mdm/equipment/daily/items/{0}/{1}'
            }
          },
          detail: {
            list: {
              url: '/api/mdm/equipment/class/items/{0}/{1}'
            }
          },
          deterior: {
            list: {
              url: '/api/mdm/equipment/deterior/items/{0}/{1}'
            }
          }
        }
      },
      spareParts: {
        list: {
          url: '/api/mdm/equipment/spareparts'
        }
      },
      psm: {
        list: {
          url: '/api/mdm/fim/equipment/psm'
        }
      },
      license: {
        list: {
          url: '/api/mdm/fim/equipment/license'
        }
      }
    },
    senior: {
      list: {
        url: '/api/mdm/senior/seniors'
      },
      status: {
        list: {
          url: '/api/mdm/senior/statuses'
        },
        get: {
          url: '/api/mdm/senior/status/{0}'
        },
        rev: {
          url: '/api/mdm/senior/status/revs',
          get: {
            url: '/api/mdm/senior/status/rev/{0}'
          }
        }
      }
    }
  },
  sai: {
    vendor: {
      safety: {
        plan: {
          list: {
            url: '/api/sai/vendor/safety/plans'
          },
          get: {
            url: '/api/sai/vendor/safety/plan/{0}'
          }
        }
      }
    },
    joint: {
      list: {
        url: '/api/sai/joint/inspections'
      },
      get: {
        url: '/api/sai/joint/inspection'
      },
      impr: {
        url: '/api/sai/joint/inspection/improves/impr'
      },
      items: {
        url: '/api/sai/joint/inspection/items'
      }
    },
    budget: {
      item: {
        list: {
          url: '/api/sai/budget/items'
        }
      },
      year: {
        list: {
          url: '/api/sai/budget/years'
        },
        get: {
          url: '/api/sai/budget/year/{0}'
        },
        check: {
          url: '/api/sai/budget/year/check'
        },
        plant: {
          url: '/api/sai/budget/year/plant'
        }
      },
      result: {
        list: {
          url: '/api/sai/budget/results'
        },
        get: {
          url: '/api/sai/budget/result/{0}'
        },
        check: {
          url: '/api/sai/budget/result/check'
        }
      },
      compare: {
        list: {
          url: '/api/sai/budget/compares'
        }
      }
    },
    safetyHealthy: {
      list: {
        url: '/api/sai/safetyHealthyTargets'
      },
      get: {
        url: '/api/sai/safetyHealthyTarget/{0}'
      },
      result: {
        list: {
          url: '/api/sai/safetyHealthyTarget/results'
        }
      },
      base: {
        list: {
          url: '/api/sai/safetyHealthies'
        },
        detail: {
          list: {
            url: '/api/sai/safetyHealthyDetails'
          }
        }
      }
    },
    mainsafetyHealthy: {
      list: {
        url: '/api/main/safetyHealthyTargets'
      },
      get: {
        url: '/api/main/safetyHealthyTarget/{0}'
      },
      result: {
        list: {
          url: '/api/main/safetyHealthyTarget/results'
        }
      },
      base: {
        list: {
          url: '/api/main/safetyHealthies'
        },
        detail: {
          list: {
            url: '/api/main/safetyHealthyDetails'
          }
        }
      }
    },
    evalTable: {
      complianceEvalTable: {
        list: {
          url: '/api/sai/evalTable/complianceEvalTables'
        },
        get: {
          url: '/api/sai/evalTable/complianceEvalTable/{0}'
        },
        rev: {
          url: '/api/sai/evalTable/complianceEvalTable/revs'
        },
        results: {
          url: '/api/sai/evalTable/complianceEvalTable/results'
        }
      }
    },
    lawRegister: {
      gubun: {
        list: {
          url: '/api/sai/law/master/lawRegisters'
        }
      },
      item: {
        list: {
          url: '/api/sai/law/item/lawRegisters'
        },
        get: {
          url: '/api/sai/law/item/lawRegister/{0}'
        }
      }
    },
    lawCheck: {
      check: {
        list: {
          url: '/api/sai/law/lawCheck/checks'
        },
        get: {
          url: '/api/sai/law/lawCheck/check/{0}'
        }
      }
    },
    lawMaking: {
      check: {
        list: {
          url: '/api/sai/law/lawMaking/checks'
        },
        get: {
          url: '/api/sai/law/lawMaking/check/{0}'
        }
      }
    },
    outernal: {
      result: {
        list: {
          url: '/api/sai/outernalResults'
        },
        get: {
          url: '/api/sai/outernalResult/{0}'
        },
        impr: {
          url: '/api/sai/outernalResult/imprs'
        }
      }
    },
    internal: {
      base: {
        systemChecklist: {
          list: {
            url: '/api/sai/internal/base/checklistSystems'
          }
        },
        checklist: {
          list: {
            url: '/api/sai/internal/base/checklists'
          },
          get: {
            url: '/api/sai/internal/base/checklist/{0}'
          }
        }
      },
      yearPlan: {
        list: {
          url: '/api/sai/internal/yearPlans'
        },
        get: {
          url: '/api/sai/internal/yearPlan/{0}'
        },
        auditTeam: {
          list: {
            url: '/api/sai/internal/yearPlan/auditTeams'
          }
        }
      },
      action: {
        list: {
          url: '/api/sai/internal/action/internalActions'
        },
        get: {
          url: '/api/sai/internal/action/internalAction/{0}'
        },
        checklistResult: {
          list: {
            url: '/api/sai/internal/action/internalChecklistResults'
          },
          depts: {
            url: '/api/sai/internal/action/internalChecklistResultsByDept'
          },
          impr: {
            url: '/api/sai/internal/action/impr/internalChecklistResults'
          }
        }
      },
      targetDept: {
        list: {
          url: '/api/sai/internal/action/internalTargetDepts'
        },
        get: {
          url: '/api/sai/internal/action/internalTargetDept/{0}'
        }
      }
    },
    uninjury: {
      list: {
        url: '/api/sai/uninjury/standard'
      },
      get: {
        url: '/api/sai/uninjury'
      },
      historys: {
        url: '/api/sai/uninjury/historys'
      }
    },
    tbm: {
      list: {
        url: '/api/sai/tbm/tbms'
      },
      get: {
        url: '/api/sai/tbm/tbm/{0}',
        equip: {
          result: {
            url: '/api/sai/tbm/equip/result/{0}'
          }
        }
      },
      print: {
        url: '/api/sai/tbm/print/{0}'
      },
      respond: {
        url: '/api/sai/tbm/respond/{0}/{1}'
      }
    },
    hazard: {
      list: {
        url: '/api/sai/hazard/hazards',
        dept: {
          url: '/api/sai/hazard/hazard/depts',
          checkup: {
            url: '/api/sai/hazard/hazard/checkup/depts'
          }
        }
      },
      get: {
        url: '/api/sai/hazard/hazard/{0}',
        dept: {
          url: '/api/sai/hazard/hazard/dept/{0}'
        }
      },
      check: {
        url: '/api/sai/hazard/hazard/check'
      },
      substance: {
        list: {
          url: '/api/sai/hazard/hazard/substances'
        }
      },
      master: {
        list: {
          url: '/api/sai/hazard/masters'
        }
      }
    },
    workmeas: {
      plan: {
        list: {
          url: '/api/sai/work/plans'
        },
        get: {
          url: '/api/sai/work/plan/{0}'
        },
        check: {
          url: '/api/sai/work/plan/check/{0}/{1}/{2}'
        }
      },
      result: {
        list: {
          url: '/api/sai/work/results'
        },
        get: {
          url: '/api/sai/work/result/{0}'
        },
        chart: {
          url: '/api/sai/work/result/chart'
        },
        factor: {
          url: '/api/sai/work/result/factor'
        },
        impr: {
          url: '/api/sai/work/result/impr'
        }
      }
    },
    osh: {
      proceedings: {
        list: {
          url: '/api/sai/osh/proceedings'
        },
        get: {
          url: '/api/sai/osh/proceedings/{0}'
        }
      }
    },
    shm: {
      policy: {
        list: {
          url: '/api/sai/shm/policies'
        },
        get: {
          url: '/api/sai/shm/policy/{0}'
        }
      }
    },
    iso: {
      report: {
        list: {
          url: '/api/sai/iso/reports'
        },
        get: {
          url: '/api/sai/iso/report'
        }
      },
      document: {
        list: {
          url: '/api/sai/iso/documents'
        },
        get: {
          url: '/api/sai/iso/document'
        }
      }
    },
    sob: {
      board: {
        list: {
          url: '/api/sai/sob/boards'
        },
        get: {
          url: '/api/sai/sob/board/{0}'
        }
      }
    },
    patrol: {
      resultItem: {
        list: {
          url: '/api/sai/patrol/result/items',
          mst: '/api/sai/patrol/result/itemsMst'
        }
      },
      list: {
        url: '/api/sai/ptl/patrols'
      },
      get: {
        url: '/api/sai/ptl/patrol/{0}'
      },
      graph: {
        result: {
          url: '/api/sai/ptl/patrol/graphs/result'
        },
        resultitem: {
          url: '/api/sai/ptl/patrol/graphs/resultitem'
        },
        itemresult: {
          url: '/api/sai/ptl/patrol/graphs/itemresult'
        }
      }
    },
    patrolvendor: {
      resultItem: {
        list: {
          url: '/api/sai/patrol/vendor/result/items'
        }
      },
      list: {
        url: '/api/sai/patrol/vendor/patrols'
      },
      get: {
        url: '/api/sai/patrol/vendor/patrol/{0}'
      },
      improve: {
        get: {
          url: '/api/sai/patrol/vendor/patrol/improve/{0}'
        },
        impr: {
          url: '/api/sai/patrol/vendor/patrol/improves/impr'
        }
      }
    },
    sse: {
      selfEvaluation: {
        list: {
          url: '/api/sai/sse/selfEvaluations'
        },
        get: {
          url: '/api/sai/sse/selfEvaluation/{0}'
        }
      },
      selfEvaluationTableItem: {
        list: {
          url: '/api/sai/sse/selfEvaluationTableItems'
        }
      },
      selfEvaluationClassInnerStandard: {
        list: {
          url: '/api/sai/sse/selfEvaluationClassInnerStandards'
        }
      }
    }
  },
  hea: {
    ihj: {
      list: {
        url: '/api/hea/ihj/industryHealthJournals'
      },
      get: {
        url: '/api/hea/ihj/industryHealthJournal/{0}'
      }
    },
    bcs: {
      survey: {
        list: {
          url: '/api/hea/bcs/brainCardiovascular/surveies'
        },
        get: {
          url: '/api/hea/bcs/brainCardiovascular/survey/{0}'
        }
      },
      evalItem: {
        list: {
          url: '/api/hea/bcs/brainCardiovascular/evalItems'
        }
      },
      riskPrediction: {
        list: {
          url: '/api/hea/bcs/brainCardiovascular/riskPredictions'
        }
      }
    },
    closedspaceMap: {
      list: {
        url: '/api/hea/closedspaceMaps'
      }
    },
    temp: {
      cafe: {
        order: {
          list: {
            url: '/api/hea/temp/order/coffeeOrders'
          }
        },
        takeOrder: {
          list: {
            url: '/api/hea/temp/takeOrder/coffeeTakeOrders'
          },
          get: {
            url: '/api/hea/temp/takeOrder/coffeeTakeOrder/{0}'
          }
        }
      }
    },
    jobStress: {
      plan: {
        list: {
          url: '/api/hea/jss/jobStressPlans'
        },
        get: {
          url: '/api/hea/jss/jobStressPlan/{0}'
        },
        status: {
          url: '/api/hea/jss/jobStressPlan/status/{0}'
        }
      },
      user: {
        list: {
          url: '/api/hea/jss/jobStress/assessUsers'
        },
        get: {
          url: '/api/hea/jss/jobStress/assessUser/{0}'
        }
      },
      impr: {
        list: {
          url: '/api/hea/jss/jobStressImprs'
        }
      },
      base: {
        item: {
          list: {
            url: '/api/hea/jss/base/jobStressItems'
          }
        }
      }
    },
    muscleSystem: {
      surveyChecklist: {
        list: {
          url: '/api/hea/mss/survey/checklist'
        }
      },
      painArea: {
        list: {
          url: '/api/hea/mss/survey/painArea'
        }
      },
      investigationPlan: {
        list: {
          url: '/api/hea/mss/investigationPlans'
        },
        get: {
          url: '/api/hea/mss/investigationPlan/{0}'
        }
      },
      muscleSop: {
        list: {
          url: '/api/hea/mss/muscleSops'
        },
        get: {
          url: '/api/hea/mss/muscleSop/{0}'
        },
        invest: {
          list: {
            url: '/api/hea/mss/invest/muscleSops'
          }
        }
      },
      muscleHeavyWork: {
        list: {
          url: '/api/hea/mss/muscleHeavyWorks'
        }
      },
      muscleSopHazard: {
        list: {
          url: '/api/hea/mss/muscleSopHazards'
        }
      },
      muscleSopResult: {
        list: {
          url: '/api/hea/mss/muscleSopResults'
        }
      },
      muscleSurvey: {
        list: {
          url: '/api/hea/mss/muscleSurveys'
        },
        get: {
          url: '/api/hea/mss/muscleSurvey/{0}'
        }
      },
      muscleSopResultImpr: {
        list: {
          url: '/api/hea/mss/muscleSopResultImprs'
        }
      }
    },
    heavyWork: {
      list: {
        url: '/api/hea/base/heavyWorks'
      },
      get: {
        url: '/api/hea/base/heavyWork'
      }
    },
    disease: {
      list: {
        url: '/api/hea/checkup/diseases'
      },
      check: {
        url: '/api/hea/checkup/check/disease'
      }
    },
    examine: {
      list: {
        url: '/api/hea/checkup/examines'
      },
      check: {
        url: '/api/hea/checkup/check/examine'
      },
      tempUploadList: {
        url: '/api/hea/checkup/examines/tempUpload'
      },
      tempExamineCompareList: {
        url: '/api/hea/checkup/examines/compareUpload'
      }
    },
    opinion: {
      tempUploadList: {
        url: '/api/hea/checkup/opinions/tempUpload'
      },
      tempOpinionCompareList: {
        url: '/api/hea/checkup/opinions/compareUpload'
      }
    },
    hospital: {
      list: {
        url: '/api/hea/checkup/hospitals'
      },
      check: {
        url: '/api/hea/checkup/check/hospitals'
      }
    },
    medicine: {
      list: {
        url: '/api/hea/checkup/medicines'
      },
      check: {
        url: '/api/hea/checkup/check/medicine'
      }
    },
    checkup: {
      plan: {
        list: {
          url: '/api/hea/checkup/plans'
        },
        get: {
          url: '/api/hea/checkup/plan/{0}'
        },
        target: {
          users: {
            url: '/api/hea/checkup/target/users'
          }
        }
      },
      result: {
        list: {
          url: '/api/hea/checkup/results'
        },
        get: {
          url: '/api/hea/checkup/result'
        },
        status: {
          url: '/api/hea/checkup/status/results'
        },
        excelUpload: {
          url: '/api/hea/checkup/result/excelupload/{0}'
        }
      },
      opinion: {
        list: {
          url: '/api/hea/checkup/opinions'
        },
        get: {
          url: '/api/hea/checkup/opinion/{0}/{1}'
        },
        excelUpload: {
          url: '/api/hea/checkup/opinion/excelupload/{0}'
        }
      },
      reserve: {
        list: {
          url: '/api/hea/checkup/reserves'
        },
        get: {
          url: '/api/hea/checkup/reserve/{0}'
        }
      },
      implementation: {
        list: {
          url: '/api/hea/checkup/implementations'
        }
      },
      individual: {
        list: {
          url: '/api/hea/checkup/individuals'
        }
      },
      suspect: {
        user: {
          list: {
            url: '/api/hea/suspect/users'
          },
          release: {
            url: '/api/hea/suspect/release'
          },
          history: {
            url: '/api/hea/suspect/user/histories'
          },
          get: {
            url: '/api/hea/suspect/user/{0}'
          },
          target: {
            url: '/api/hea/suspect/user/target'
          }
        },
        consult: {
          list: {
            url: '/api/hea/suspect/consults'
          },
          get: {
            url: '/api/hea/suspect/consult/{0}'
          }
        },
        history: {
          consult: {
            url: '/api/hea/suspect/history/consults'
          },
          examine: {
            url: '/api/hea/suspect/history/examines'
          }
        },
        graph: {
          dept: {
            url: '/api/hea/suspect/graph/dept'
          },
          disease: {
            url: '/api/hea/suspect/graph/disease'
          },
          hazard: {
            url: '/api/hea/suspect/graph/hazard'
          }
        }
      },
      night: {
        list: {
          url: '/api/hea/checkup/nights'
        }
      }
    },
    cse: {
      gives: {
        list: {
          url: '/api/hea/cse/closed/gives'
        },
        get: {
          url: '/api/hea/cse/closed/give/{0}'
        }
      },
      equip: {
        list: {
          url: '/api/hea/cse/closed/equips'
        }
      }
    },
    sih: {
      check: {
        list: {
          url: '/api/hea/site/journals'
        },
        get: {
          url: '/api/hea/site/journal/{0}'
        }
      },
      item: {
        list: {
          url: '/api/hea/site/items'
        }
      }
    }
  },
  env: {
    facility: {
      list: {
        url: '/api/env/hcf/facilities'
      },
      get: {
        url: '/api/env/hcf/facility/{0}'
      }
    },
    facilityInspectionClass: {
      list: {
        url: '/api/env/hcf/facility/inspectionClasses'
      }
    },
    facilityCheckItem: {
      list: {
        url: '/api/env/hcf/facility/checkItems'
      }
    },
    facilitySelfCheck: {
      list: {
        url: '/api/env/hcf/facility/selfChecks'
      },
      get: {
        url: '/api/env/hcf/facility/selfCheck/{0}'
      },
      item: {
        url: '/api/env/hcf/facility/default/selfCheckItemResults'
      },
      print: {
        url: '/api/env/hcf/facility/print/selfCheck/{0}'
      },
      weeks: {
        url: '/api/env/hcf/facility/selfCheckWeeks'
      }
    },
    facilitySelfCheckItem: {
      list: {
        url: '/api/env/hcf/facility/selfCheckItems'
      }
    },
    gov: {
      mst: {
        list: {
          url: '/api/env/gov/sch/msts'
        },
        get: {
          url: '/api/env/gov/sch/mst'
        }
      },
      history: {
        list: {
          url: '/api/env/gov/sch/historys'
        },
        get: {
          url: '/api/env/gov/sch/history'
        }
      }
    },
    water: {
      trust: {
        list: {
          url: '/api/env/water/trusts'
        },
        get: {
          url: '/api/env/water/trust'
        },
        check: {
          url: '/api/env/water/trust/check'
        },
        uc: {
          url: '/api/env/water/trust/uc'
        }
      },
      self: {
        measure: {
          list: {
            url: '/api/env/water/self/measures'
          },
          get: {
            url: '/api/env/water/self/measure'
          },
          graph: {
            url: '/api/env/water/self/measure/graph'
          }
        },
        measureloc: {
          list: {
            url: '/api/env/water/self/measure/measurelocs'
          },
          header: {
            url: '/api/env/water/self/measure/measureloc/headers'
          }
        }
      },
      entrust: {
        result: {
          list: {
            url: '/api/env/water/entrust/results'
          },
          get: {
            url: '/api/env/water/entrust/result'
          }
        },
        additive: {
          list: {
            url: '/api/env/water/entrust/additives'
          }
        }
      },
      daily: {
        result: {
          list: {
            url: '/api/env/water/daily/results'
          },
          get: {
            url: '/api/env/water/daily/result'
          },
          print: {
            url: '/api/env/water/daily/result/print/{0}'
          }
        },
        additive: {
          list: {
            url: '/api/env/water/daily/result/additives'
          }
        },
        aerationtank: {
          list: {
            url: '/api/env/water/daily/result/aerationtanks'
          }
        },
        discharge: {
          list: {
            url: '/api/env/water/daily/result/discharges'
          }
        },
        diswater: {
          list: {
            url: '/api/env/water/daily/result/diswaters'
          }
        },
        drug: {
          list: {
            url: '/api/env/water/daily/result/drugs'
          }
        },
        guidance: {
          list: {
            url: '/api/env/water/daily/result/guidances'
          }
        },
        measure: {
          list: {
            url: '/api/env/water/daily/result/measures'
          }
        },
        preventive: {
          list: {
            url: '/api/env/water/daily/result/preventives'
          }
        },
        sludge: {
          list: {
            url: '/api/env/water/daily/result/sludges'
          }
        },
        supwater: {
          list: {
            url: '/api/env/water/daily/result/supwaters'
          }
        },
        user: {
          list: {
            url: '/api/env/water/daily/result/users'
          }
        },
        wattmeter: {
          list: {
            url: '/api/env/water/daily/result/wattmeters'
          }
        }
      },
      mst: {
        preventive: {
          list: {
            url: '/api/env/water/mst/preventives'
          },
          get: {
            url: '/api/env/water/mst/preventive/{0}'
          },
          breakdown: {
            list: {
              url: '/api/env/water/mst/preventive/breakdowns'
            },
            get: {
              url: '/api/env/water/mst/preventive/breakdown'
            }
          }
        },
        discharge: {
          list: {
            url: '/api/env/water/mst/discharges'
          },
          get: {
            url: '/api/env/water/mst/discharge/{0}'
          }
        },
        wattmeter: {
          list: {
            url: '/api/env/water/mst/wattmeters'
          },
          get: {
            url: '/api/env/water/mst/wattmeter/{0}'
          }
        },
        diswater: {
          list: {
            url: '/api/env/water/mst/diswaters'
          },
          get: {
            url: '/api/env/water/mst/diswater/{0}'
          }
        },
        supwater: {
          list: {
            url: '/api/env/water/mst/supwaters'
          },
          get: {
            url: '/api/env/water/mst/supwater/{0}'
          }
        },
        measureloc: {
          list: {
            url: '/api/env/water/mst/measurelocs'
          },
          get: {
            url: '/api/env/water/mst/measureloc/{0}'
          }
        },
        additive: {
          list: {
            url: '/api/env/water/mst/additives'
          },
          get: {
            url: '/api/env/water/mst/additive/{0}'
          }
        },
        drug: {
          list: {
            url: '/api/env/water/mst/drugs'
          },
          get: {
            url: '/api/env/water/mst/drug/{0}'
          }
        },
        aerationtank: {
          list: {
            url: '/api/env/water/mst/aerationtanks'
          },
          get: {
            url: '/api/env/water/mst/aerationtank/{0}'
          }
        },
        inspect: {
          list: {
            url: '/api/env/water/mst/inspects'
          },
          get: {
            url: '/api/env/water/mst/inspect/{0}'
          },
          plant: {
            url: '/api/env/water/mst/inspect/plants'
          }
        }
      }
    },
    waste: {
      mst: {
        list: {
          url: '/api/env/waste/msts'
        },
        get: {
          url: '/api/env/waste/mst'
        },
        sub: {
          url: '/api/env/waste/mst/sub/{0}'
        },
        subPop: {
          url: '/api/env/waste/mst/sub'
        }
      },
      allbaro: {
        list: {
          url: '/api/env/waste/allbaros'
        },
        get: {
          url: '/api/env/waste/allbaro'
        }
      },
      volume: {
        list: {
          url: '/api/env/waste/volumes'
        },
        get: {
          url: '/api/env/waste/volume'
        },
        empty: {
          url: '/api/env/waste/volume/empty'
        },
        check: {
          url: '/api/env/waste/volume/check'
        },
        uc: {
          url: '/api/env/waste/volume/uc'
        }
      }
    },
    air: {
      daily: {
        result: {
          list: {
            url: '/api/env/air/daily/results'
          },
          get: {
            url: '/api/env/air/daily/result'
          },
          print: {
            url: '/api/env/air/daily/result/print/{0}'
          }
        },
        outlet: {
          list: {
            url: '/api/env/air/daily/result/outlets'
          }
        },
        preventive: {
          list: {
            url: '/api/env/air/daily/result/preventives'
          },
          history: {
            url: '/api/env/air/daily/result/preventive/historys'
          }
        },
        fuel: {
          list: {
            url: '/api/env/air/daily/result/fuels'
          }
        },
        material: {
          list: {
            url: '/api/env/air/daily/result/materials'
          }
        }
      },
      mst: {
        outlet: {
          list: {
            url: '/api/env/air/mst/outlets'
          },
          get: {
            url: '/api/env/air/mst/outlet'
          },
          discharge: {
            url: '/api/env/air/mst/outlet/discharges'
          },
          part: {
            url: '/api/env/air/mst/outlet/parts',
            status: '/api/env/air/mst/outlet/parts/status'
          },
          inspect: {
            url: '/api/env/air/mst/outlet/inspects'
          }
        },
        discharge: {
          list: {
            url: '/api/env/air/mst/discharges'
          },
          get: {
            url: '/api/env/air/mst/discharge'
          },
          fuel: {
            url: '/api/env/air/mst/discharge/fuels'
          }
        },
        preventive: {
          list: {
            url: '/api/env/air/mst/preventives'
          },
          get: {
            url: '/api/env/air/mst/preventive'
          }
        },
        fuel: {
          list: {
            url: '/api/env/air/mst/fuels'
          },
          get: {
            url: '/api/env/air/mst/fuel'
          }
        },
        material: {
          list: {
            url: '/api/env/air/mst/materials'
          },
          get: {
            url: '/api/env/air/mst/material'
          }
        },
        drug: {
          list: {
            url: '/api/env/air/mst/drugs'
          },
          get: {
            url: '/api/env/air/mst/drug'
          }
        },
        wattmeter: {
          list: {
            url: '/api/env/air/mst/wattmeters'
          },
          get: {
            url: '/api/env/air/mst/wattmeter'
          }
        },
        inspect: {
          list: {
            url: '/api/env/air/mst/inspects'
          },
          get: {
            url: '/api/env/air/mst/inspect'
          },
          plant: {
            url: '/api/env/air/mst/inspect/plants'
          },
          check: {
            url: '/api/env/air/mst/inspect/plant/check'
          }
        },
        history: {
          list: {
            url: '/api/env/air/mst/outlet/part/historys'
          },
          get: {
            url: '/api/env/air/mst/outlet/part/history'
          }
        }
      },
      self: {
        measure: {
          list: {
            url: '/api/env/air/self/measures'
          },
          get: {
            url: '/api/env/air/self/measure'
          },
          graph: {
            url: '/api/env/air/self/measure/graph'
          }
        },
        outlet: {
          list: {
            url: '/api/env/air/self/measure/outlets'
          },
          header: {
            url: '/api/env/air/self/measure/outlet/headers'
          }
        }
      },
      sems: {
        oprtimes: {
          list: {
            url: '/api/env/air/sems/oprtimes'
          }
        },
        prehis: {
          list: {
            url: '/api/env/air/sems/prehis'
          }
        },
        oprequips: {
          list: {
            url: '/api/env/air/sems/oprequips'
          }
        },
        fuels: {
          list: {
            url: '/api/env/air/sems/fuels'
          }
        },
        materials: {
          list: {
            url: '/api/env/air/sems/materials'
          }
        }
      }
    }
  },
  chm: {
    base: {
      dangerItem: {
        list: {
          url: '/api/chm/base/dangerItems'
        }
      },
      chemBase: {
        list: {
          url: '/api/mdm/mam/chem/chemBases'
        },
        get: {
          url: '/api/mdm/mam/chem/chemBase/{0}'
        },
        valid: {
          url: '/api/mdm/mam/chem/chemBase/valid'
        },
        detailList: {
          url: '/api/mdm/mam/chem/detail/chemBases'
        }
      },
      chemBaseColumnSetting: {
        get: {
          url: '/api/mdm/mam/chem/chemBase/columnSetting'
        }
      }
    },
    db: {
      regulDbUpload: {
        list: {
          url: '/api/chm/db/regulDbUploads'
        },
        validFail: {
          url: '/api/chm/db/regulDbUpload/validFail'
        },
        hostory: {
          url: '/api/chm/db/regulDbUpload/changeHistory'
        }
      }
    },
    facilityStatusTable: {
      list: {
        url: '/api/chm/facilityStatusTables'
      },
      get: {
        url: '/api/chm/facilityStatusTable/{0}'
      },
      base: {
        url: '/api/chm/facilityStatusTable/base'
      },
      print: {
        url: '/api/chm/facilityStatusTable/print/{0}'
      }
    },
    danger: {
      master: {
        list: {
          url: '/api/chm/danger/masters'
        },
        get: {
          url: '/api/chm/danger/master/{0}'
        }
      },
      item: {
        list: {
          url: '/api/chm/danger/master/items'
        }
      },
      map: {
        list: {
          url: '/api/chm/danger/maps'
        }
      },
      journal: {
        list: {
          url: '/api/chm/danger/journals'
        },
        get: {
          url: '/api/chm/danger/journal/{0}'
        },
        result: {
          url: '/api/chm/danger/journal/results'
        }
      },
      masterItems: {
        list: {
          url: '/api/chm/danger/master/checkItems'
        }
      },
      regularChecks: {
        list: {
          url: '/api/chm/danger/regular/checks'
        },
        get: {
          url: '/api/chm/danger/regular/check/{0}'
        }
      }
    },
    inout: {
      list: {
        url: '/api/chm/inoutManages'
      },
      get: {
        url: '/api/chm/inoutManage'
      },
      valid: {
        url: '/api/chm/inoutManage/valid'
      },
      status: {
        url: '/api/chm/inoutManages/status'
      },
      inoutstatus: {
        url: '/api/chm/inout/inoutManages/status'
      },
      print: {
        url: '/api/chm/inoutManage/print'
      },
      statistics: {
        url: '/api/chm/inoutManage/statistics'
      },
      emissions: {
        url: '/api/chm/inoutManage/emissions'
      },
      yearMonth: {
        url: '/api/chm/inoutManage/yearMonths'
      }
    },
    save: {
      list: {
        url: '/api/chm/saveManages'
      },
      status: {
        url: '/api/chm/saveManages/status'
      },
      print: {
        url: '/api/chm/saveManage/print'
      },
      yearMonth: {
        url: '/api/chm/saveManage/yearMonths'
      }
    },
    knowhow: {
      list: {
        url: '/api/chm/knowhows'
      },
      get: {
        url: '/api/chm/knowhow/{0}'
      },
      valid: {
        url: '/api/chm/knowhow/valid'
      },
      print: {
        url: '/api/chm/knowhow/print/{0}'
      }
    },
    summary: {
      get: {
        url: '/api/chm/summary'
      },
      print: {
        url: '/api/chm/summary/print/{0}'
      }
    }
  },
  smf: {
    usePlan: {
      list: {
        url: '/api/smf/usePlans'
      },
      get: {
        url: '/api/smf/usePlan'
      },
      revs: {
        url: '/api/smf/usePlan/revs'
      },
      rev: {
        url: '/api/smf/usePlan/rev'
      }
    },
    monthlyPerformance: {
      list: {
        url: '/api/smf/monthlyPerformances'
      },
      get: {
        url: '/api/smf/monthlyPerformance'
      }
    },
    monthlyPerformanceVendor: {
      get: {
        url: '/api/smf/monthlyPerformanceVendor'
      }
    },
    statementItemUse: {
      vendor: {
        list: {
          url: '/api/smf/statementItemUse/vendors'
        },
        print: {
          url: '/api/smf/statementItemUse/print/vendor'
        }
      },
      list: {
        url: '/api/smf/statementItemUses'
      },
      print: {
        url: '/api/smf/statementItemUse/print'
      }
    }
  },
  openApi: {
    kosha: {
      list: {
        url: '/api/openapi/kosha/msdses'
      },
      get: {
        url: '/api/openapi/kosha/msds'
      },
      charm: {
        url: '/api/openapi/kosha/charms'
      }
    }
  }
}

export default selectConfig
