/**
 * 수정용 config
 */
const transactionConfig = {
  auth: {
    login: {
      insert: {
        url: '/api/auth/login'
      },
      logout: {
        url: '/api/auth/logout'
      },
      update: {
        url: '/api/auth/logout/{0}'
      },
      changepw: {
        url: '/api/auth/user/changepw'
      },
      nextChangePw: {
        url: '/api/auth/user/nextChangePw'
      }
    }
  },
  com: {
    upload: {
      uploading: {
        url: '/api/com/upload'
      },
      update: {
        url: '/api/com/upload'
      },
      save: {
        url: '/api/com/update/taskKey'
      },
      delete: {
        url: '/api/com/upload/{0}'
      },
      allDelete: {
        url: '/api/com/upload/all/{0}/{1}'
      },
      copy: {
        url: '/api/com/upload/copy'
      }
    }
  },
  sys: {
    language: {
      save: {
        url: '/api/system/lang/language'
      },
      commcd: {
        url: '/api/system/lang/language/commcd'
      },
      delete: {
        url: '/api/system/lang/language'
      }
    },
    push: {
      specific: {
        insert: {
          url: '/api/sys/push/specific'
        },
        update: {
          url: '/api/sys/push/specific'
        },
        delete: {
          url: '/api/sys/push/specific/{0}'
        }
      },
      history: {
        delete: {
          url: '/api/sys/push/history/{0}'
        },
        user: {
          url: '/api/sys/push/history/all/{0}'
        }
      }
    },
    appr: {
      type: {
        insert: {
          url: '/api/sys/appr/type'
        },
        update: {
          url: '/api/sys/appr/type'
        },
        delete: {
          url: '/api/sys/appr/type/{0}'
        }
      },
      transfer: {
        insert: {
          url: '/api/sys/appr/transfer'
        },
        delete: {
          url: '/api/sys/appr/transfer'
        }
      },
      request: {
        insert: {
          url: '/api/sys/appr/request'
        },
        update: {
          url: '/api/sys/appr/request'
        },
        return: {
          url: '/api/sys/appr/request/return'
        },
        retrieve: {
          url: '/api/sys/appr/request/retrieve/{0}'
        }
      }
    },
    log: {
      menulog: {
        insert: {
          url: '/api/sys/log/menulog'
        }
      }
    },
    favorite: {
      save: {
        url: '/api/sys/favorites'
      },
      insert: {
        url: '/api/sys/favorite'
      },
      delete: {
        url: '/api/sys/favorite'
      }
    },
    menu: {
      insert: {
        url: '/api/sys/men/menu'
      },
      update: {
        url: '/api/sys/men/menu'
      },
      delete: {
        url: '/api/sys/men/menu/{0}'
      }
    },
    manual: {
      insert: {
        url: '/api/sys/men/manual'
      },
      update: {
        url: '/api/sys/men/manual'
      }
    },
    sequence: {
      insert: {
        url: '/api/sys/sequence'
      },
      update: {
        url: '/api/sys/sequence'
      },
      delete: {
        url: '/api/sys/sequence/{0}'
      }
    },
    attach: {
      insert: {
        url: '/api/sys/attachsetting'
      },
      update: {
        url: '/api/sys/attachsetting'
      },
      delete: {
        url: '/api/sys/attachsetting/{0}'
      }
    },
    excelUpload: {
      insert: {
        url: '/api/sys/excelUploadSetting'
      },
      insertInfo: {
        url: '/api/sys/excelUpload'
      },
      update: {
        url: '/api/sys/excelUploadSetting'
      }
    },
    batch: {
      insert: {
        url: '/api/sys/batchsetting'
      },
      update: {
        url: '/api/sys/batchsetting'
      },
      delete: {
        url: '/api/sys/batchsetting/{0}'
      }
    },
    env: {
      insert: {
        url: '/api/sys/env'
      },
      update: {
        url: '/api/sys/env'
      },
      delete: {
        url: '/api/sys/env/{0}'
      }
    },
    defect: {
      insert: {
        url: '/api/sys/defect'
      },
      update: {
        url: '/api/sys/defect'
      },
      delete: {
        url: '/api/sys/defect/{0}'
      }
    },
    notice: {
      insert: {
        url: '/api/sys/notice'
      },
      update: {
        url: '/api/sys/notice'
      },
      delete: {
        url: '/api/sys/notice/{0}'
      }
    },
    code: {
      domain: {
        save: {
          url: '/api/sys/code/domain'
        },
        delete: {
          url: '/api/sys/code/domain'
        }
      },
      group: {
        save: {
          url: '/api/sys/code/grp'
        },
        delete: {
          url: '/api/sys/code/grp'
        }
      },
      mst: {
        save: {
          url: '/api/sys/code/mst'
        },
        delete: {
          url: '/api/sys/code/mst'
        }
      },
      lang: {
        save: {
          url: '/api/sys/code/lang'
        }
      }
    },
    stepper: {
      grp: {
        save: {
          url: '/api/sys/stepper/grp'
        },
        delete: {
          url: '/api/sys/stepper/grp'
        }
      },
      mst: {
        save: {
          url: '/api/sys/stepper/mst'
        },
        lang: {
          url: '/api/sys/stepper/mst/lang'
        },
        delete: {
          url: '/api/sys/stepper/mst'
        }
      }
    },
    auth: {
      grp: {
        insert: {
          url: '/api/sys/auth/grp'
        },
        update: {
          url: '/api/sys/auth/grp'
        },
        delete: {
          url: '/api/sys/auth/grp/{0}'
        }
      },
      menu: {
        add: {
          url: '/api/sys/auth/menu/add'
        },
        save: {
          url: '/api/sys/auth/menu'
        },
        delete: {
          url: '/api/sys/auth/menu'
        }
      },
      dept: {
        insert: {
          url: '/api/sys/auth/dept'
        },
        delete: {
          url: '/api/sys/auth/dept'
        }
      },
      user: {
        insert: {
          url: '/api/sys/auth/user'
        },
        delete: {
          url: '/api/sys/auth/user'
        }
      },
      deptauth: {
        insert: {
          url: '/api/sys/auth/deptauth'
        },
        delete: {
          url: '/api/sys/auth/deptauth'
        }
      },
      userauth: {
        insert: {
          url: '/api/sys/auth/userauth'
        },
        delete: {
          url: '/api/sys/auth/userauth'
        }
      },
      plant: {
        insert: {
          url: '/api/sys/auth/plant'
        }
      }
    }
  },
  ram: {
    variable: {
      insert: {
        url: '/api/ram/base/variable'
      },
      update: {
        url: '/api/ram/base/variable'
      }
    },
    matrix: {
      insert: {
        url: '/api/ram/base/matrix'
      },
      update: {
        url: '/api/ram/base/matrix'
      }
    },
    riskType: {
      insert: {
        url: '/api/ram/base/riskType'
      },
      update: {
        url: '/api/ram/base/riskType'
      }
    },
    riskThirdStandard: {
      save: {
        url: '/api/ram/base/riskThirdStandard'
      }
    },
    riskHazard: {
      update: {
        url: '/api/ram/base/riskHazard'
      }
    },
    fmRiskHazard: {
      save: {
        url: '/api/ram/base/4mRiskHazard'
      }
    },
    assessPlan: {
      insert: {
        url: '/api/ram/assess/plan'
      },
      update: {
        url: '/api/ram/assess/plan'
      },
      delete: {
        url: '/api/ram/assess/plan/{0}'
      },
      complete: {
        url: '/api/ram/assess/plan/complete'
      },
      request: {
        url: '/api/ram/assess/plan/request'
      },
      return: {
        url: '/api/ram/assess/plan/return'
      },
      load: {
        url: '/api/ram/assess/plan/load'
      },
      recheck: {
        url: '/api/ram/assess/plan/recheck'
      },
      task: {
        insert: {
          url: '/api/ram/assess/plan/tasks'
        },
        delete: {
          url: '/api/ram/assess/plan/tasks'
        }
      },
      accident: {
        insert: {
          url: '/api/ram/assess/plan/accident'
        },
        delete: {
          url: '/api/ram/assess/plan/accident'
        }
      }
    },
    assessTeam: {
      update: {
        url: '/api/ram/assess/team'
      },
      delete: {
        url: '/api/ram/assess/team'
      }
    },
    assessOccasion: {
      update: {
        url: '/api/ram/assess/occasion'
      },
      delete: {
        url: '/api/ram/assess/occasion'
      }
    },
    assessConference: {
      update: {
        url: '/api/ram/assess/conference'
      },
      delete: {
        url: '/api/ram/assess/conference'
      }
    },
    relatedDocument: {
      update: {
        url: '/api/ram/assess/relatedDocument'
      },
      delete: {
        url: '/api/ram/assess/relatedDocument'
      }
    },
    relateAccident: {
      url: '/api/ram/assess/plan/accident'
    },
    assessProcess: {
      insert: {
        url: '/api/ram/assess/process'
      },
      update: {
        url: '/api/ram/assess/process'
      },
      delete: {
        url: '/api/ram/assess/process'
      },
      estimation: {
        url: '/api/ram/assess/process/estimation'
      },
      estimationComplete: {
        url: '/api/ram/assess/process/estimation/complete'
      },
      complete: {
        url: '/api/ram/assess/process/complete'
      },
      checklist: {
        insert: {
          url: '/api/ram/checklist/assess/process'
        },
        update: {
          url: '/api/ram/checklist/assess/process'
        },
        delete: {
          url: '/api/ram/checklist/assess/process'
        },
        complete: {
          url: '/api/ram/checklist/assess/process/complete'
        }
      }
    },
    drawNode: {
      save: {
        url: '/api/ram/assess/draw'
      },
      delete: {
        url: '/api/ram/assess/draw'
      }
    },
    assessSop: {
      save: {
        url: '/api/ram/assess/sop'
      },
      delete: {
        url: '/api/ram/assess/sop'
      }
    },
    riskRegister: {
      delete: {
        url: '/api/ram/riskRegister/{0}'
      }
    },
    kpsr: {
      scenario: {
        save: {
          url: '/api/ram/kpsr/scenario'
        },
        delete: {
          url: '/api/ram/kpsr/scenario'
        }
      }
    },
    hazop: {
      scenario: {
        save: {
          url: '/api/ram/hazop/scenario'
        },
        delete: {
          url: '/api/ram/hazop/scenario'
        },
        check: {
          url: '/api/ram/hazop/scenario/check'
        }
      }
    },
    jsa: {
      scenario: {
        save: {
          url: '/api/ram/jsa/scenario'
        },
        saveUnit: {
          url: '/api/ram/jsa/scenario/unit'
        },
        delete: {
          url: '/api/ram/jsa/scenario'
        }
      }
    },
    third: {
      scenario: {
        save: {
          url: '/api/ram/third/scenario'
        },
        saveUnit: {
          url: '/api/ram/third/scenario/unit'
        },
        delete: {
          url: '/api/ram/third/scenario'
        }
      }
    },
    kras: {
      scenario: {
        save: {
          url: '/api/ram/kras/scenario'
        },
        saveUnit: {
          url: '/api/ram/kras/scenario/unit'
        },
        delete: {
          url: '/api/ram/kras/scenario'
        }
      }
    },
    fm: {
      scenario: {
        save: {
          url: '/api/ram/4m/scenario'
        },
        saveUnit: {
          url: '/api/ram/4m/scenario/unit'
        },
        delete: {
          url: '/api/ram/4m/scenario'
        }
      },
      impr: {
        inserts: {
          url: '/api/ram/4m/assess/riskReduce/imprs'
        },
        insert: {
          url: '/api/ram/4m/assess/riskReduce/impr'
        },
        update: {
          url: '/api/ram/4m/assess/riskReduce/impr'
        },
        delete: {
          url: '/api/ram/4m/assess/riskReduce/impr/{0}'
        },
        complete: {
          url: '/api/ram/4m/assess/riskReduce/impr/complete'
        }
      }
    },
    charm: {
      scenario: {
        target: {
          url: '/api/ram/charm/result/target/scenario'
        },
        estimation: {
          url: '/api/ram/charm/estimation/scenario'
        },
        result: {
          url: '/api/ram/charm/result/scenario'
        },
        delete: {
          url: '/api/ram/charm/scenario'
        },
        saveUnit: {
          url: '/api/ram/charm/result/scenario/unit'
        },
        estimationSave: {
          url: '/api/ram/charm/estimation/scenario/unit'
        }
      }
    },
    checklist: {
      scenario: {
        save: {
          url: '/api/ram/checklist/scenario'
        },
        saveUnit: {
          url: '/api/ram/checklist/scenario/unit'
        },
        delete: {
          url: '/api/ram/checklist/scenario'
        }
      },
      target: {
        save: {
          url: '/api/ram/assess/checklist/target'
        },
        delete: {
          url: '/api/ram/assess/checklist/target'
        }
      },
      riskRegister: {
        delete: {
          url: '/api/ram/checklist/riskRegister'
        }
      },
      master: {
        insert: {
          url: '/api/ram/checklist/master'
        },
        delete: {
          url: '/api/ram/checklist/master'
        }
      }
    }
  },
  fft: {
    base: {
      item: {
        save: {
          url: '/api/fft/base/fireFightingItem'
        }
      },
      utvItem: {
        save: {
          url: '/api/fft/base/fireFightingUtvItem'
        }
      },
      location: {
        save: {
          url: '/api/fft/base/fireFightingLocation'
        }
      }
    },
    fireFighting: {
      insert: {
        url: '/api/fft/fireFighting'
      },
      update: {
        url: '/api/fft/fireFighting'
      },
      delete: {
        url: '/api/fft/fireFighting/{0}'
      }
    },
    fireFightingMap: {
      insert: {
        url: '/api/fft/fireFightingMap'
      },
      update: {
        url: '/api/fft/fireFightingMap'
      }
    },
    fireFightingResultMap: {
      insert: {
        url: '/api/fft/fireFightingResultMap'
      },
      update: {
        url: '/api/fft/fireFightingResultMap'
      },
      delete: {
        url: '/api/fft/fireFightingResultMap/{0}'
      }
    },
    fireFightingReceivingSetHistory: {
      insert: {
        url: '/api/fft/fireFightingReceivingSetHistory'
      },
      update: {
        url: '/api/fft/fireFightingReceivingSetHistory'
      },
      delete: {
        url: '/api/fft/fireFightingReceivingSetHistory/{0}'
      }
    },
    fireFightingPermit: {
      save: {
        url: '/api/fft/fireFightingPermit'
      },
      complete: {
        url: '/api/fft/fireFightingPermit/complete'
      },
      checklistItem: {
        save: {
          url: '/api/fft/base/fireFightingPermit/checklistItem'
        }
      }
    },
    fireFightingUtv: {
      save: {
        url: '/api/fft/utv/fireFightingUtv'
      }
    },
    fireFightingDocument: {
      insert: {
        url: '/api/fft/fireFightingDocument'
      },
      update: {
        url: '/api/fft/fireFightingDocument'
      }
    },
    oraganizaionUserDept: {
      insert: {
        url: '/api/fft/fireFighting/oraganizaionUserDept'
      },
      insertDelete: {
        url: '/api/fft/fireFighting/oraganizaionUserDept/re'
      },
      delete: {
        url: '/api/fft/fireFighting/oraganizaionUserDept/{0}'
      }
    },
    fireFightingTrainingScenario: {
      insert: {
        url: '/api/fft/fts/fireFightingTrainingScenario'
      },
      update: {
        url: '/api/fft/fts/fireFightingTrainingScenario'
      },
      delete: {
        url: '/api/fft/fts/fireFightingTrainingScenario/{0}'
      }
    },
    fireFightingTraningEdu: {
      insert: {
        url: '/api/fft/fte/fireFightingTraningEdu'
      },
      update: {
        url: '/api/fft/fte/fireFightingTraningEdu'
      },
      delete: {
        url: '/api/fft/fte/fireFightingTraningEdu/{0}'
      },
      plancomplete: {
        url: '/api/fft/fte/fireFightingTraningEdu/plancomplete'
      },
      actioncomplete: {
        url: '/api/fft/fte/fireFightingTraningEdu/actioncomplete'
      },
      user: {
        save: {
          url: '/api/fft/fte/fireFightingTraningEduUser'
        },
        delete: {
          url: '/api/fft/fte/fireFightingTraningEduUser'
        }
      },
      scenario: {
        save: {
          url: '/api/fft/fte/fireFightingTraningEduScenarioResult'
        },
        delete: {
          url: '/api/fft/fte/fireFightingTraningEduScenarioResult'
        }
      }
    },
    fireFightingTraningEduYear: {
      insert: {
        url: '/api/fft/fte/fireFightingTraningEduYear'
      },
      update: {
        url: '/api/fft/fte/fireFightingTraningEduYear'
      },
      delete: {
        url: '/api/fft/fte/fireFightingTraningEduYear/{0}'
      },
      complete: {
        url: '/api/fft/fte/fireFightingTraningEduYear/complete'
      }
    },
    fireFightingUtvCheck: {
      insert: {
        url: '/api/fft/utv/fireFightingUtvCheck'
      },
      update: {
        url: '/api/fft/utv/fireFightingUtvCheck'
      },
      delete: {
        url: '/api/fft/utv/fireFightingUtvCheck/{0}'
      },
      complete: {
        url: '/api/fft/utv/fireFightingUtvCheck/complete'
      }
    },
    fireFightingLegalCheck: {
      insert: {
        url: '/api/fft/fireFightingLegalCheck'
      },
      update: {
        url: '/api/fft/fireFightingLegalCheck'
      },
      delete: {
        url: '/api/fft/fireFightingLegalCheck/{0}'
      }
    },
    fireFightingIssueCheck: {
      insert: {
        url: '/api/fft/ise/fireFightingIssueCheck'
      },
      update: {
        url: '/api/fft/ise/fireFightingIssueCheck'
      },
      request: {
        url: '/api/fft/ise/fireFightingIssueCheck/request'
      },
      confirm: {
        url: '/api/fft/ise/fireFightingIssueCheck/confirm'
      },
      complete: {
        url: '/api/fft/ise/fireFightingIssueCheck/complete'
      },
      delete: {
        url: '/api/fft/ise/fireFightingIssueCheck/{0}'
      },
      target: {
        update: {
          url: '/api/fft/ise/fireFightingIssueCheckTarget'
        }
      }
    },
    fireFightingCheck: {
      insert: {
        url: '/api/fft/fireFightingCheck'
      },
      update: {
        url: '/api/fft/fireFightingCheck'
      },
      delete: {
        url: '/api/fft/fireFightingCheck/{0}'
      },
      complete: {
        url: '/api/fft/fireFightingCheck/complete'
      }
    },
    fireFightingJournal: {
      insert: {
        url: '/api/fft/fireFighting/journal'
      },
      update: {
        url: '/api/fft/fireFighting/journal'
      },
      delete: {
        url: '/api/fft/fireFighting/journal/{0}'
      }
    },
    fireFightingPerformanceResult: {
      insert: {
        url: '/api/fft/fireFighting/performanceResult'
      },
      update: {
        url: '/api/fft/fireFighting/performanceResult'
      },
      delete: {
        url: '/api/fft/fireFighting/performanceResult/{0}'
      }
    },
    selfDefenseFireBrigade: {
      insert: {
        url: '/api/fft/selfDefenseFireBrigade'
      },
      update: {
        url: '/api/fft/selfDefenseFireBrigade'
      }
    }
  },
  sop: {
    heq: {
      inspectitem: {
        save: {
          url: '/api/sop/heq/type/inspectitem'
        },
        delete: {
          url: '/api/sop/heq/type/inspectitem'
        }
      },
      hhmtype: {
        save: {
          url: '/api/sop/heq/type'
        },
        delete: {
          url: '/api/sop/heq/type'
        }
      },
      forkLift: {
        insert: {
          url: '/api/sop/heq/forkLift'
        },
        update: {
          url: '/api/sop/heq/forkLift'
        },
        delete: {
          url: '/api/sop/heq/forkLift/{0}'
        },
        result: {
          insert: {
            url: '/api/sop/heq/forkLift/result'
          },
          update: {
            url: '/api/sop/heq/forkLift/result'
          },
          delete: {
            url: '/api/sop/heq/forkLift/result'
          },
          delete2: {
            url: '/api/sop/heq/forkLift/result/{0}'
          }
        }
      }
    },
    pwc: {
      class: {
        save: {
          url: '/api/sop/pwc/preWorkCheckClass'
        }
      },
      item: {
        save: {
          url: '/api/sop/pwc/preWorkCheckItem'
        }
      },
      check: {
        insert: {
          url: '/api/sop/pwc/preWorkCheck'
        },
        update: {
          url: '/api/sop/pwc/preWorkCheck'
        },
        complete: {
          url: '/api/sop/pwc/preWorkCheck/complete'
        },
        delete: {
          url: '/api/sop/pwc/preWorkCheck/{0}'
        }
      }
    },
    eme: {
      contact: {
        insert: {
          url: '/api/sop/eme/contact/mst'
        },
        update: {
          url: '/api/sop/eme/contact/mst'
        },
        delete: {
          url: '/api/sop/eme/contact/mst/{0}'
        }
      },
      network: {
        save: {
          url: '/api/sop/eme/contact/network'
        },
        delete: {
          url: '/api/sop/eme/contact/network'
        }
      }
    },
    scm: {
      construction: {
        insert: {
          url: '/api/sop/scm/construction'
        },
        update: {
          url: '/api/sop/scm/construction'
        },
        delete: {
          url: '/api/sop/scm/construction/{0}'
        },
        task: {
          insert: {
            url: '/api/sop/scm/construction/tasks'
          },
          delete: {
            url: '/api/sop/scm/construction/tasks'
          }
        }
      }
    },
    lim: {
      lincense: {
        kind: {
          save: {
            url: '/api/sop/lim/licensekind'
          },
          delete: {
            url: '/api/sop/lim/licensekind'
          }
        },
        request: {
          insert: {
            url: '/api/sop/lim/license/request'
          },
          update: {
            url: '/api/sop/lim/license/request'
          },
          delete: {
            url: '/api/sop/lim/license/request/{0}'
          },
          reviewRequest: {
            url: '/api/sop/lim/license/request/reviewRequest'
          },
          reviewRecepit: {
            url: '/api/sop/lim/license/request/reviewRecepit'
          },
          reviewComplete: {
            url: '/api/sop/lim/license/request/reviewComplete'
          },
          reviewReject: {
            url: '/api/sop/lim/license/request/reviewReject'
          }
        },
        review: {
          insert: {
            url: '/api/sop/lim/license/review'
          },
          update: {
            url: '/api/sop/lim/license/review'
          },
          delete: {
            url: '/api/sop/lim/license/review/{0}'
          }
        },
        card: {
          insert: {
            url: '/api/sop/lim/license/card'
          },
          update: {
            url: '/api/sop/lim/license/card'
          },
          delete: {
            url: '/api/sop/lim/license/card/{0}'
          }
        },
        equipment: {
          insert: {
            url: '/api/sop/lim/license/equipment'
          },
          delete: {
            url: '/api/sop/lim/license/equipment'
          }
        },
        material: {
          insert: {
            url: '/api/sop/lim/license/material'
          },
          delete: {
            url: '/api/sop/lim/license/material'
          }
        }
      }
    },
    ibm: {
      improve: {
        insert: {
          url: '/api/sop/ibm/improvement',
          multi: {
            url: '/api/sop/ibm/improvements'
          }
        },
        update: {
          url: '/api/sop/ibm/improvement'
        },
        delete: {
          url: '/api/sop/ibm/improvement/{0}'
        },
        approval: {
          url: '/api/sop/ibm/improvement/approval'
        }
      }
    },
    psr: {
      checkItem: {
        insert: {
          url: '/api/sop/psr/prestartup/checkItem'
        },
        update: {
          url: '/api/sop/psr/prestartup/checkItem'
        }
      },
      check: {
        insert: {
          url: '/api/sop/psr/prestartupCheck'
        },
        update: {
          url: '/api/sop/psr/prestartupCheck'
        },
        delete: {
          url: '/api/sop/psr/prestartupCheck/{0}'
        },
        complete: {
          url: '/api/sop/psr/prestartup/complete'
        },
        equipment: {
          complete: {
            url: '/api/sop/psr/prestartup/equipment/complete'
          },
          delete: {
            url: '/api/sop/psr/prestartupCheck/equipment'
          },
          update: {
            url: '/api/sop/psr/prestartup/equipment'
          }
        }
      }
    },
    swp: {
      workChekItem: {
        save: {
          url: '/api/sop/swp/checkItem'
        }
      },
      gas: {
        save: {
          url: '/api/sop/swp/gas'
        }
      },
      map: {
        save: {
          url: '/api/sop/swp/map'
        }
      },
      workPermit: {
        insert: {
          url: '/api/sop/swp/workPermit'
        },
        update: {
          url: '/api/sop/swp/workPermit'
        },
        gasUpdate: {
          url: '/api/sop/swp/workPermit/gas'
        },
        delete: {
          url: '/api/sop/swp/workPermit/{0}'
        },
        approval: {
          url: '/api/sop/swp/workPermit/approval'
        },
        over: {
          url: '/api/sop/swp/workPermit/over'
        },
        cancel: {
          url: '/api/sop/swp/workPermit/cancel'
        },
        reqApproval: {
          url: '/api/sop/swp/workPermit/reqApproval'
        },
        complete: {
          url: '/api/sop/swp/workPermit/complete'
        }
      }
    },
    moc: {
      change: {
        insert: {
          url: '/api/sop/moc/moc'
        },
        update: {
          url: '/api/sop/moc/moc'
        },
        delete: {
          url: '/api/sop/moc/moc/{0}'
        },
        complete: {
          url: '/api/sop/moc/moc/complete'
        }
      },
      checklist: {
        save: {
          url: '/api/sop/moc/moc/checklist'
        },
        delete: {
          url: '/api/sop/moc/moc/checklist'
        }
      },
      review: {
        save: {
          url: '/api/sop/moc/moc/review'
        },
        delete: {
          url: '/api/sop/moc/moc/review'
        }
      },
      committee: {
        save: {
          url: '/api/sop/moc/moc/committee'
        },
        delete: {
          url: '/api/sop/moc/moc/committee'
        }
      },
      committeeReviewItem: {
        save: {
          url: '/api/sop/moc/moc/committee/reviewItem'
        },
        delete: {
          url: '/api/sop/moc/moc/committee/reviewItem'
        },
        update: {
          url: '/api/sop/moc/moc/committee/reviewItem/update'
        }
      },
      committeeHold: {
        save: {
          url: '/api/sop/moc/moc/committeeHold'
        },
        approval: {
          url: '/api/sop/moc/moc/committeeHold/approval'
        },
        keep: {
          url: '/api/sop/moc/moc/committeeHold/keep'
        }
      },
      relatedWork: {
        save: {
          url: '/api/sop/moc/moc/relatedWorks'
        },
        singleSave: {
          url: '/api/sop/moc/moc/relatedWork'
        },
        complete: {
          url: '/api/sop/moc/moc/relatedWork/complete'
        },
        completeCancel: {
          url: '/api/sop/moc/moc/relatedWork/completeCancel'
        },
        delete: {
          url: '/api/sop/moc/moc/relatedWork'
        }
      },
      relationEquip: {
        save: {
          url: '/api/sop/moc/relation/equipment/moc'
        },
        delete: {
          url: '/api/sop/moc/relation/equipment/moc'
        }
      },
      relatedWorkDocument: {
        save: {
          url: '/api/sop/moc/moc/relatedWorkDocument'
        }
      },
      restorationEquipment: {
        update: {
          url: '/api/sop/moc/moc/restorationEquipment'
        }
      },
      determination: {
        save: {
          url: '/api/sop/moc/determination/checklist'
        }
      }
    },
    min: {
      equipment: {
        plan: {
          daily: {
            insert: {
              url: '/api/sop/min/equipment/daily/plan'
            },
            update: {
              url: '/api/sop/min/equipment/daily/plan'
            },
            complete: {
              url: '/api/sop/min/equipment/daily/plan/complete'
            },
            delete: {
              url: '/api/sop/min/equipment/daily/plan/{0}'
            }
          },
          insert: {
            url: '/api/sop/min/equipment/plan'
          },
          update: {
            url: '/api/sop/min/equipment/plan'
          },
          complete: {
            url: '/api/sop/min/equipment/plan/complete'
          },
          delete: {
            url: '/api/sop/min/equipment/plan'
          }
        },
        result: {
          daily: {
            insert: {
              url: '/api/sop/min/equipment/daily/result'
            },
            update: {
              url: '/api/sop/min/equipment/daily/result'
            },
            complete: {
              url: '/api/sop/min/equipment/daily/result/complete'
            },
            delete: {
              url: '/api/sop/min/equipment/daily/result/{0}'
            },
            newItem: {
              url: '/api/sop/min/equipment/daily/new/result'
            }
          },
          insert: {
            url: '/api/sop/min/equipment/result'
          },
          update: {
            url: '/api/sop/min/equipment/result'
          },
          updates: {
            url: '/api/sop/min/equipment/results'
          },
          updateItem: {
            url: '/api/sop/min/equipment/result/items'
          },
          complete: {
            url: '/api/sop/min/equipment/result/complete'
          },
          completes: {
            url: '/api/sop/min/equipment/result/completes'
          },
          delete: {
            url: '/api/sop/min/equipment/result'
          }
        },
        improve: {
          insert: {
            url: '/api/sop/min/equipment/improve'
          },
          update: {
            url: '/api/sop/min/equipment/improve'
          },
          delete: {
            url: '/api/sop/min/equipment/improve'
          }
        }
      },
      maintenance: {
        plan: {
          insert: {
            url: '/api/sop/min/maintenance/plan'
          },
          update: {
            url: '/api/sop/min/maintenance/plan'
          },
          complete: {
            url: '/api/sop/min/maintenance/plan/complete'
          },
          delete: {
            url: '/api/sop/min/maintenance/plan'
          }
        },
        result: {
          insert: {
            url: '/api/sop/min/maintenance/result'
          },
          update: {
            url: '/api/sop/min/maintenance/result'
          },
          updates: {
            url: '/api/sop/min/maintenance/results'
          },
          complete: {
            url: '/api/sop/min/maintenance/result/complete'
          },
          completes: {
            url: '/api/sop/min/maintenance/result/completes'
          },
          delete: {
            url: '/api/sop/min/maintenance/result'
          }
        }
      }
    },
    safetycheck: {
      item: {
        save: {
          url: '/api/sop/min/smd/safetycheck/item'
        }
      },
      plan: {
        insert: {
          url: '/api/sop/min/smd/safetycheck/plan'
        },
        update: {
          url: '/api/sop/min/smd/safetycheck/plan'
        },
        delete: {
          url: '/api/sop/min/smd/safetycheck/plan/{0}'
        }
      },
      result: {
        newItem: {
          url: '/api/sop/min/smd/safetycheck/result/new'
        }
      }
    },
    hhm: {
      hazard: {
        check: {
          insert: {
            url: '/api/sop/hhm/hazard/equipment'
          },
          update: {
            url: '/api/sop/hhm/hazard/equipment'
          },
          delete: {
            url: '/api/sop/hhm/hazard/equipment/{0}'
          },
          uploadSave: {
            url: '/api/sop/hhm/hazard/equipment/upload'
          }
        },
        hazardHistory: {
          insert: {
            url: '/api/sop/hhm/hazard/equipment/history'
          },
          update: {
            url: '/api/sop/hhm/hazard/equipment/history'
          },
          delete: {
            url: '/api/sop/hhm/hazard/equipment/history'
          },
          result: {
            save: {
              url: '/api/sop/hhm/hazard/equipment/history/result'
            },
            save2: {
              url: '/api/sop/hhm/hazard/equipment/history/result2'
            },
            save3: {
              url: '/api/sop/hhm/hazard/equipment/history/result3'
            },
            delete3: {
              url: '/api/sop/hhm/hazard/equipment/history/result3'
            }
          }
        },
        hazardMap: {
          insert: {
            url: '/api/sop/hhm/hazard/equipment/map'
          },
          delete: {
            url: '/api/sop/hhm/hazard/equipment/map/{0}'
          }
        },
        hazardImprove: {
          insert: {
            url: '/api/sop/hhm/hazard/equipment/improve'
          },
          update: {
            url: '/api/sop/hhm/hazard/equipment/improve'
          },
          delete: {
            url: '/api/sop/hhm/hazard/equipment/improve'
          }
        },
        inspection: {
          target: {
            save: {
              url: '/api/sop/hhm/hazard/equipment/inspection/target'
            },
            delete: {
              url: '/api/sop/hhm/hazard/equipment/inspection/target'
            }
          },
          item: {
            insert: {
              url: '/api/sop/hhm/hazard/equipment/inspection/item'
            },
            update: {
              url: '/api/sop/hhm/hazard/equipment/inspection/item'
            },
            delete: {
              url: '/api/sop/hhm/hazard/equipment/inspection/item'
            }
          }
        },
        history: {
          insert: {
            url: '/api/sop/hhm/hazard/equipment/inspection/history'
          },
          update: {
            url: '/api/sop/hhm/hazard/equipment/inspection/history'
          },
          delete: {
            url: '/api/sop/hhm/hazard/equipment/inspection/history/{0}'
          }
        }
      }
    },
    edu: {
      course: {
        insert: {
          url: '/api/sop/edu/course/info'
        },
        update: {
          url: '/api/sop/edu/course/info'
        },
        delete: {
          url: '/api/sop/edu/course/info/{0}'
        },
        multisave: {
          url: '/api/sop/edu/course/multi/info'
        },
        multidelete: {
          url: '/api/sop/edu/course/multi/info'
        },
        usersave: {
          url: '/api/sop/edu/course/info/user'
        },
        userdelete: {
          url: '/api/sop/edu/course/info/user'
        },
        deptsave: {
          url: '/api/sop/edu/course/info/dept'
        },
        deptdelete: {
          url: '/api/sop/edu/course/info/dept'
        },
        seniorsave: {
          url: '/api/sop/edu/course/info/senior'
        },
        seniordelete: {
          url: '/api/sop/edu/course/info/senior'
        }
      },
      attendee: {
        insert: {
          url: '/api/sop/edu/course/attendee'
        },
        update: {
          url: '/api/sop/edu/course/attendee'
        }
      },
      vod: {
        insert: {
          url: '/api/sop/edu/attendee/vod'
        },
        update: {
          url: '/api/sop/edu/attendee/vod'
        }
      },
      annual: {
        save: {
          url: '/api/sop/edu/annual/plan'
        },
        delete: {
          url: '/api/sop/edu/annual/plan'
        },
        complete: {
          url: '/api/sop/edu/annual/plan/complete'
        }
      },
      plan: {
        insert: {
          url: '/api/sop/edu/result',
          targetUser: {
            url: '/api/sop/edu/result/targetuser'
          },
          exceltargetUser: {
            url: '/api/sop/edu/result/targetuser/excel'
          },
          exceltargetUsers: {
            url: '/api/sop/edu/result/targetusers/excel'
          }
        },
        update: {
          url: '/api/sop/edu/result',
          targetUser: {
            signature: {
              url: '/api/sop/edu/result/targetuser/signature'
            }
          }
        },
        delete: {
          url: '/api/sop/edu/result/{0}',
          targetUser: {
            url: '/api/sop/edu/result/targetuser'
          }
        },
        complete: {
          url: '/api/sop/edu/result'
        }
      },
      result: {
        insert: {
          url: '/api/sop/edu/result/sec'
        },
        update: {
          url: '/api/sop/edu/result/sec'
        },
        complete: {
          url: '/api/sop/edu/complete/result/sec'
        },
        evalUser: {
          insert: {
            url: '/api/sop/edu/result/evalUser'
          },
          delete: {
            url: '/api/sop/edu/result/evalUser'
          }
        }
      },
      quiz: {
        mst: {
          insert: {
            url: '/api/sop/edu/quiz/mst'
          },
          update: {
            url: '/api/sop/edu/quiz/mst'
          },
          delete: {
            url: '/api/sop/edu/quiz/mst/{0}'
          }
        },
        question: {
          insert: {
            url: '/api/sop/edu/quiz/question'
          },
          delete: {
            url: '/api/sop/edu/quiz/question'
          }
        },
        answer: {
          insert: {
            url: '/api/sop/edu/quiz/answer'
          },
          delete: {
            url: '/api/sop/edu/quiz/answer'
          }
        },
        result: {
          insert: {
            url: '/api/sop/edu/quiz/result'
          }
        }
      }
    },
    iim: {
      occurForm: {
        save: {
          url: '/api/sop/iim/occur/form'
        },
        delete: {
          url: '/api/sop/iim/occur/form'
        }
      },
      accident: {
        near: {
          insert: {
            url: '/api/sop/iim/accident/near'
          },
          update: {
            url: '/api/sop/iim/accident/near'
          },
          delete: {
            url: '/api/sop/iim/accident/near/{0}',
            victim: {
              url: '/api/sop/iim/accident/near/victim'
            }
          },
          complete: {
            url: '/api/sop/iim/accident/near/complete'
          },
          prevention: {
            update: {
              url: '/api/sop/iim/accident/near/prevention',
              cause: {
                url: '/api/sop/iim/accident/near/prevention/causes'
              }
            },
            delete: {
              url: '/api/sop/iim/accident/near/prevention'
            },
            complete: {
              url: '/api/sop/iim/accident/near/prevention/complete'
            }
          },
          examine: {
            update: {
              url: '/api/sop/iim/accident/near/examine'
            },
            complete: {
              url: '/api/sop/iim/accident/near/examine/complete'
            }
          }
        },
        process: {
          insert: {
            url: '/api/sop/iim/accident/process'
          },
          update: {
            url: '/api/sop/iim/accident/process',
            relate: {
              url: '/api/sop/iim/accident/process/relate'
            },
            damage: {
              url: '/api/sop/iim/accident/process/damage'
            }
          },
          delete: {
            url: '/api/sop/iim/accident/process/{0}',
            chem: {
              url: '/api/sop/iim/accident/process/chem'
            },
            equip: {
              url: '/api/sop/iim/accident/process/equip'
            }
          },
          complete: {
            url: '/api/sop/iim/accident/process/complete'
          },
          reportTab: {
            insert: {
              url: '/api/sop/iim/accident/process/reporttab'
            },
            delete: {
              url: '/api/sop/iim/accident/process/reporttab/{0}/{1}'
            }
          },
          investigation: {
            insert: {
              url: '/api/sop/iim/accident/process/investigation'
            },
            update: {
              url: '/api/sop/iim/accident/process/investigation',
              status: {
                url: '/api/sop/iim/accident/process/investigation/status'
              }
            },
            complete: {
              url: '/api/sop/iim/accident/process/investigation/complete'
            },
            delete: {
              url: '/api/sop/iim/accident/process/investigation/{0}'
            }
          },
          prevention: {
            update: {
              url: '/api/sop/iim/accident/process/prevention',
              cause: {
                url: '/api/sop/iim/accident/process/prevention/causes'
              }
            },
            delete: {
              url: '/api/sop/iim/accident/process/prevention'
            }
          }
        }
      }
    },
    eap: {
      emergTraining: {
        insert: {
          url: '/api/sop/eap/plan/docu'
        },
        update: {
          url: '/api/sop/eap/plan/docu'
        }
      },
      planResult: {
        insert: {
          url: '/api/sop/eap/plan'
        },
        update: {
          url: '/api/sop/eap/plan'
        },
        complete: {
          url: '/api/sop/eap/plan/complete'
        },
        delete: {
          url: '/api/sop/eap/plan/{0}'
        },
        result: {
          update: {
            url: '/api/sop/eap/result'
          },
          complete: {
            url: '/api/sop/eap/result/complete'
          }
        }
      },
      emergScenario: {
        insert: {
          url: '/api/sop/eap/training'
        },
        update: {
          url: '/api/sop/eap/training'
        },
        delete: {
          url: '/api/sop/eap/plan/scenario/{0}'
        }
      },
      eval: {
        insert: {
          url: '/api/sop/eap/eval'
        },
        update: {
          url: '/api/sop/eap/eval'
        },
        delete: {
          url: '/api/sop/eap/eval/{0}'
        }
      },
      base: {
        insert: {
          url: '/api/sop/eap/eval/item'
        },
        delete: {
          url: '/api/sop/eap/eval/item'
        }
      },
      relation: {
        insert: {
          url: '/api/sop/eap/eval/relation'
        },
        delete: {
          url: '/api/sop/eap/eval/relation'
        }
      },
      planDocu: {
        insert: {
          url: '/api/sop/eap/plan/docu'
        },
        update: {
          url: '/api/sop/eap/plan/docu'
        },
        delete: {
          url: '/api/sop/eap/plan/docu/{0}'
        }
      },
      scenario: {
        insert: {
          url: '/api/sop/eap/plan/scenario'
        },
        update: {
          url: '/api/sop/eap/plan/scenario'
        },
        delete: {
          url: '/api/sop/eap/plan/scenario/{0}'
        }
      },
      relateAccident: {
        insert: {
          url: '/api/sop/eap/plan/relate/accident'
        },
        delete: {
          url: '/api/sop/eap/plan/relate/accident'
        }
      },
      relateMaterial: {
        insert: {
          url: '/api/sop/eap/plan/relate/material'
        },
        delete: {
          url: '/api/sop/eap/plan/relate/material'
        }
      },
      training: {
        plan: {
          insert: {
            url: '/api/sop/eap/training/plan'
          },
          update: {
            url: '/api/sop/eap/training/plan'
          },
          delete: {
            url: '/api/sop/eap/training/plan/{0}'
          }
        }
      }
    },
    opm: {
      folder: {
        insert: {
          url: '/api/sop/opm/folder'
        },
        update: {
          url: '/api/sop/opm/folder'
        },
        delete: {
          url: '/api/sop/opm/folder/{0}'
        }
      },
      folderDetail: {
        insert: {
          url: '/api/sop/opm/folder/detail'
        },
        update: {
          url: '/api/sop/opm/folder/detail'
        },
        delete: {
          url: '/api/sop/opm/folder/detail/{0}'
        }
      },
      guidebook: {
        insert: {
          url: '/api/sop/opm/guidebook'
        },
        update: {
          url: '/api/sop/opm/guidebook'
        }
      }
    },
    cto: {
      insert: {
        url: '/api/sop/bho/cto'
      },
      update: {
        url: '/api/sop/bho/cto'
      },
      delete: {
        url: '/api/sop/bho/cto/{0}'
      },
      complete: {
        url: '/api/sop/bho/cto/complete'
      },
      checklist: {
        save: {
          url: '/api/sop/bho/cto/checklist'
        }
      },
      stdchecklist: {
        save: {
          url: '/api/sop/cto/std/checklist'
        },
        delete: {
          url: '/api/sop/cto/std/checklist'
        }
      }
    },
    pca: {
      improve: {
        save: {
          url: '/api/sop/pca/improve'
        },
        delete: {
          url: '/api/sop/pca/improve'
        }
      },
      item: {
        rev: {
          url: '/api/sop/pca/item/rev'
        },
        save: {
          url: '/api/sop/pca/item'
        },
        delete: {
          url: '/api/sop/pca/item'
        }
      },
      type: {
        save: {
          url: '/api/sop/pca/item/type'
        },
        delete: {
          url: '/api/sop/pca/item/type'
        }
      },
      typeitem: {
        save: {
          url: '/api/sop/pca/item/type/item'
        },
        delete: {
          url: '/api/sop/pca/item/type/item'
        }
      },
      result: {
        info: {
          insert: {
            url: '/api/sop/pca/result'
          },
          update: {
            url: '/api/sop/pca/result'
          },
          delete: {
            url: '/api/sop/pca/result/{0}'
          },
          planend: {
            url: '/api/sop/pca/result/planend'
          }
        },
        item: {
          save: {
            url: '/api/sop/pca/item/result'
          }
        },
        process: {
          save: {
            url: '/api/sop/pca/result/process'
          },
          delete: {
            url: '/api/sop/pca/result/process'
          }
        },
        equipment: {
          save: {
            url: '/api/sop/pca/result/equipment'
          },
          delete: {
            url: '/api/sop/pca/result/equipment'
          }
        },
        dept: {
          save: {
            url: '/api/sop/pca/result/dept'
          },
          delete: {
            url: '/api/sop/pca/result/dept'
          }
        },
        exec: {
          save: {
            url: '/api/sop/pca/result/exec'
          },
          delete: {
            url: '/api/sop/pca/result/exec'
          }
        },
        org: {
          save: {
            url: '/api/sop/pca/result/org'
          },
          delete: {
            url: '/api/sop/pca/result/org'
          }
        }
      }
    },
    sas: {
      safetyGear: {
        save: {
          url: '/api/sop/sas/safety/gear'
        }
      },
      request: {
        insert: {
          url: '/api/sop/sas/safety/gear/request'
        },
        update: {
          url: '/api/sop/sas/safety/gear/request'
        },
        delete: {
          url: '/api/sop/sas/safety/gear/request/{0}'
        }
      },
      give: {
        insert: {
          url: '/api/sop/sas/safety/gear/give'
        },
        update: {
          url: '/api/sop/sas/safety/gear/give'
        }
      },
      buy: {
        insert: {
          url: '/api/sop/sas/safety/gear/buy/request'
        },
        update: {
          url: '/api/sop/sas/safety/gear/buy/request'
        },
        delete: {
          url: '/api/sop/sas/safety/gear/buy/request/{0}'
        }
      },
      recepit: {
        insert: {
          url: '/api/sop/sas/safety/gear/recepit'
        },
        update: {
          url: '/api/sop/sas/safety/gear/recepit'
        },
        delete: {
          url: '/api/sop/sas/safety/gear/recepit'
        }
      },
      stock: {
        adjust: {
          url: '/api/sop/sas/safety/gear/stock/adjust'
        }
      }
    }
  },
  psi: {
    diagram: {
      insert: {
        url: '/api/psi/diagram'
      },
      update: {
        url: '/api/psi/diagram'
      },
      delete: {
        url: '/api/psi/diagram/{0}'
      }
    },
    document: {
      insert: {
        url: '/api/psi/document'
      },
      update: {
        url: '/api/psi/document'
      },
      delete: {
        url: '/api/psi/document/{0}'
      }
    },
    pfi: {
      power: {
        insert: {
          url: '/api/psi/pfi/power'
        },
        update: {
          url: '/api/psi/pfi/power'
        },
        delete: {
          url: '/api/psi/pfi/power/{0}'
        }
      },
      pipegasket: {
        insert: {
          url: '/api/psi/pfi/pipegasket'
        },
        update: {
          url: '/api/psi/pfi/pipegasket'
        },
        delete: {
          url: '/api/psi/pfi/pipegasket/{0}'
        },
        substance: {
          save: {
            url: '/api/psi/pfi/pipegasket/substance'
          },
          delete: {
            url: '/api/psi/pfi/pipegasket/substance'
          }
        }
      },
      device: {
        mst: {
          insert: {
            url: '/api/psi/pfi/device'
          },
          update: {
            url: '/api/psi/pfi/device'
          },
          delete: {
            url: '/api/psi/pfi/device/{0}'
          }
        },
        detail: {
          insert: {
            url: '/api/psi/pfi/devicedetail'
          },
          update: {
            url: '/api/psi/pfi/devicedetail'
          }
        }
      },
      valve: {
        insert: {
          url: '/api/psi/pfi/valve'
        },
        update: {
          url: '/api/psi/pfi/valve'
        },
        delete: {
          url: '/api/psi/pfi/valve/{0}'
        }
      }
    },
    pcd: {
      interlock: {
        insert: {
          url: '/api/psi/pcd/interlock'
        },
        update: {
          url: '/api/psi/pcd/interlock'
        },
        delete: {
          url: '/api/psi/pcd/interlock/{0}'
        }
      }
    },
    lbe: {
      fireproof: {
        insert: {
          url: '/api/psi/lbe/fireproof'
        },
        update: {
          url: '/api/psi/lbe/fireproof'
        },
        delete: {
          url: '/api/psi/lbe/fireproof/{0}'
        }
      },
      fireequip: {
        insert: {
          url: '/api/psi/lbe/fireequip'
        },
        update: {
          url: '/api/psi/lbe/fireequip'
        },
        delete: {
          url: '/api/psi/lbe/fireequip/{0}'
        }
      },
      firedetect: {
        insert: {
          url: '/api/psi/lbe/firedetect'
        },
        update: {
          url: '/api/psi/lbe/firedetect'
        },
        delete: {
          url: '/api/psi/lbe/firedetect/{0}'
        }
      },
      gasalarm: {
        insert: {
          url: '/api/psi/lbe/gasalarm'
        },
        update: {
          url: '/api/psi/lbe/gasalarm'
        },
        delete: {
          url: '/api/psi/lbe/gasalarm/{0}'
        }
      },
      localven: {
        insert: {
          url: '/api/psi/lbe/localven'
        },
        update: {
          url: '/api/psi/lbe/localven'
        },
        delete: {
          url: '/api/psi/lbe/localven/{0}'
        }
      },
      wash: {
        insert: {
          url: '/api/psi/lbe/wash'
        },
        update: {
          url: '/api/psi/lbe/wash'
        },
        delete: {
          url: '/api/psi/lbe/wash/{0}'
        }
      },
      protect: {
        insert: {
          url: '/api/psi/lbe/protect'
        },
        update: {
          url: '/api/psi/lbe/protect'
        },
        delete: {
          url: '/api/psi/lbe/protect/{0}'
        },
        item: {
          save: {
            url: '/api/psi/lbe/protectitem'
          },
          delete: {
            url: '/api/psi/lbe/protectitem'
          }
        }
      }
    }
  },
  mdm: {
    ghs: {
      nation: {
        save: '/api/mdm/ghs/nations'
      },
      mix: {
        save: '/api/mdm/ghs/mixs'
      },
      class: {
        delete: '/api/mdm/ghs/class/{0}/{1}/{2}'
      },
      db: {
        save: '/api/mdm/ghs/dbs',
        delete: '/api/mdm/ghs/db'
      }
    },
    cal: {
      mst: {
        insert: {
          url: '/api/mdm/cal/mst'
        },
        update: {
          url: '/api/mdm/cal/mst'
        },
        delete: {
          url: '/api/mdm/cal/mst/{0}/{1}'
        }
      },
      schedule: {
        insert: {
          url: '/api/mdm/cal/schedule'
        },
        update: {
          url: '/api/mdm/cal/schedule'
        },
        delete: {
          url: '/api/mdm/cal/schedule/{0}'
        }
      }
    },
    costcenter: {
      save: {
        url: '/api/mdm/cost/center'
      },
      delete: {
        url: '/api/mdm/cost/center'
      }
    },
    sws: {
      mst: {
        insert: {
          url: '/api/mdm/sws/sws'
        },
        update: {
          url: '/api/mdm/sws/sws'
        },
        delete: {
          url: '/api/mdm/sws/sws/{0}'
        },
        copy: {
          url: '/api/mdm/sws/sws/copy'
        }
      },
      work: {
        insert: {
          url: '/api/mdm/sws/work'
        },
        update: {
          url: '/api/mdm/sws/work'
        },
        delete: {
          url: '/api/mdm/sws/work/{0}'
        }
      },
      equip: {
        save: {
          url: '/api/mdm/sws/equip'
        },
        delete: {
          url: '/api/mdm/sws/equip'
        }
      },
      cost: {
        save: {
          url: '/api/mdm/sws/cost'
        },
        delete: {
          url: '/api/mdm/sws/cost'
        }
      },
      material: {
        save: {
          url: '/api/mdm/sws/material'
        },
        delete: {
          url: '/api/mdm/sws/material'
        }
      },
      service: {
        save: {
          url: '/api/mdm/sws/service'
        },
        delete: {
          url: '/api/mdm/sws/service'
        }
      },
      tool: {
        save: {
          url: '/api/mdm/sws/tool'
        },
        delete: {
          url: '/api/mdm/sws/tool'
        }
      },
      worker: {
        save: {
          url: '/api/mdm/sws/worker'
        },
        delete: {
          url: '/api/mdm/sws/worker'
        }
      }
    },
    kora: {
      document: {
        insert: {
          url: '/api/mdm/kora/document'
        },
        update: {
          url: '/api/mdm/kora/document'
        },
        delete: {
          url: '/api/mdm/kora/document/{0}'
        }
      }
    },
    lawManager: {
      insert: {
        url: '/api/mdm/law/lawManager'
      },
      delete: {
        url: '/api/mdm/law/lawManager/{0}'
      }
    },
    company: {
      insert: {
        url: '/api/mdm/cpy/company'
      },
      update: {
        url: '/api/mdm/cpy/company'
      }
    },
    plant: {
      update: {
        url: '/api/mdm/cpy/plant'
      }
    },
    deptmanager: {
      save: {
        url: '/api/mdm/dept/manager'
      },
      delete: {
        url: '/api/mdm/dept/manager'
      }
    },
    user: {
      insert: {
        url: '/api/mdm/hrm/user'
      },
      update: {
        url: '/api/mdm/hrm/user'
      },
      delete: {
        url: '/api/mdm/hrm/user/{0}'
      },
      changepw: {
        url: '/api/mdm/hrm/changepw'
      },
      reset: {
        url: '/api/mdm/hrm/resetpwd'
      },
      cycle: {
        save: {
          url: '/api/mdm/hrm/user/cycle'
        },
        uploadSave: {
          url: '/api/mdm/hrm/user/cycle/upload'
        }
      }
    },
    dept: {
      insert: {
        url: '/api/mdm/dim/dept'
      },
      update: {
        url: '/api/mdm/dim/dept'
      },
      delete: {
        url: '/api/mdm/dim/dept/{0}'
      }
    },
    process: {
      insert: {
        url: '/api/mdm/pim/process'
      },
      update: {
        url: '/api/mdm/pim/process'
      },
      delete: {
        url: '/api/mdm/pim/process/{0}'
      }
    },
    cim: {
      vendor: {
        chgId: {
          url: '/api/mdm/cim/vendor/chgId'
        },
        insert: {
          url: '/api/mdm/cim/vendor'
        },
        update: {
          url: '/api/mdm/cim/vendor'
        },
        delete: {
          url: '/api/mdm/cim/vendor/{0}'
        },
        reset: {
          url: '/api/mdm/cim/vendorpwd'
        },
        resetall: {
          url: '/api/mdm/cim/vendorpwd/all'
        },
        user: {
          save: {
            url: '/api/mdm/cim/vendoruser'
          },
          delete: {
            url: '/api/mdm/cim/vendoruser'
          }
        },
        item: {
          save: {
            url: '/api/mdm/cim/vendoreval/item'
          },
          delete: {
            url: '/api/mdm/cim/vendoreval/item'
          }
        },
        type: {
          save: {
            url: '/api/mdm/cim/vendoreval/type'
          },
          delete: {
            url: '/api/mdm/cim/vendoreval/type'
          }
        },
        attach: {
          save: {
            url: '/api/mdm/cim/vendor/attach'
          },
          delete: {
            url: '/api/mdm/cim/vendor/attach'
          }
        },
        result: {
          insert: {
            url: '/api/mdm/cim/vendoreval/result'
          },
          update: {
            url: '/api/mdm/cim/vendoreval/result'
          },
          delete: {
            url: '/api/mdm/cim/vendoreval/result/{0}'
          },
          user: {
            save: {
              url: '/api/mdm/cim/vendoreval/resultuser'
            }
          },
          item: {
            save: {
              url: '/api/mdm/cim/vendoreval/resultitem'
            },
            delete: {
              url: '/api/mdm/cim/vendoreval/resultitem'
            }
          }
        },
        council: {
          insert: {
            url: '/api/sop/vendor/council'
          },
          update: {
            url: '/api/sop/vendor/council'
          },
          delete: {
            url: '/api/sop/vendor/council/{0}'
          },
          improve: {
            update: {
              url: '/api/sop/vendor/council/improve'
            },
            delete: {
              url: '/api/sop/vendor/council/improve'
            }
          }
        }
      }
    },
    mam: {
      review: {
        insert: {
          url: '/api/mdm/mam/chem/review'
        },
        update: {
          url: '/api/mdm/mam/chem/review'
        },
        delete: {
          url: '/api/mdm/mam/chem/review/{0}'
        },
        request: {
          url: '/api/mdm/mam/chem/review/request'
        },
        complete: {
          url: '/api/mdm/mam/chem/review/complete'
        },
        return: {
          url: '/api/mdm/mam/chem/review/return'
        },
        substance: {
          save: {
            url: '/api/mdm/mam/chem/review/substances'
          },
          delete: {
            url: '/api/mdm/mam/chem/review/substances'
          }
        },
        regul: {
          save: {
            url: '/api/mdm/mam/chem/review/reguls'
          }
        },
        check: {
          complete: {
            url: '/api/mdm/mam/chem/review/checker/complete'
          },
          cancel: {
            url: '/api/mdm/mam/chem/review/checker/cancel'
          }
          // update: {
          //   url: "/api/mdm/mam/chem/review/checks"
          // },
          // delete: {
          //   url: "/api/mdm/mam/chem/review/checks"
          // },
        },
        quantity: {
          save: {
            url: '/api/mdm/mam/chem/review/subRegulQuantities'
          }
        }
      },
      material: {
        insert: {
          url: '/api/mdm/mam/material'
        },
        update: {
          url: '/api/mdm/mam/material'
        },
        delete: {
          url: '/api/mdm/mam/material/{0}'
        },
        type: {
          insert: {
            url: '/api/mdm/mam/materialtype'
          },
          update: {
            url: '/api/mdm/mam/materialtype'
          },
          delete: {
            url: '/api/mdm/mam/materialtype'
          }
        }
      },
      chem: {
        insert: {
          url: '/api/mdm/mam/chem/material'
        },
        update: {
          url: '/api/mdm/mam/chem/material'
        },
        delete: {
          url: '/api/mdm/mam/chem/material/{0}'
        },
        dept: {
          insert: {
            url: '/api/mdm/mam/chem/dept'
          },
          delete: {
            url: '/api/mdm/mam/chem/dept'
          }
        },
        msdsUnit: {
          insert: {
            url: '/api/mdm/mam/chem/material/msds'
          },
          update: {
            url: '/api/mdm/mam/chem/material/msds'
          }
        },
        process: {
          insert: {
            url: '/api/mdm/mam/chem/process'
          },
          delete: {
            url: '/api/mdm/mam/chem/process'
          }
        },
        substance: {
          save: {
            url: '/api/mdm/mam/chem/substance'
          },
          delete: {
            url: '/api/mdm/mam/chem/substance'
          }
        },
        hazard: {
          insert: {
            url: '/api/mdm/mam/chem/hazard'
          },
          update: {
            url: '/api/mdm/mam/chem/hazard'
          },
          delete: {
            url: '/api/mdm/mam/chem/hazard/{0}'
          }
        },
        quantity: {
          save: {
            url: '/api/mdm/mam/chem/subRegulQuantities'
          }
        },
        materialRegul: {
          save: {
            url: '/api/mdm/mam/chem/materialReguls'
          }
        }
      },
      regulation: {
        insert: {
          url: '/api/mdm/mam/regulation/item'
        },
        update: {
          url: '/api/mdm/mam/regulation/item'
        }
      }
    },
    sop: {
      job: {
        insert: {
          url: '/api/mdm/sop/sop'
        },
        update: {
          url: '/api/mdm/sop/sop'
        },
        revision: {
          url: '/api/mdm/sop/sop/revision/{0}'
        }
      },
      step: {
        insert: {
          url: '/api/mdm/sop/step'
        },
        update: {
          url: '/api/mdm/sop/step'
        },
        delete: {
          url: '/api/mdm/sop/step'
        }
      },
      hazardFactor: {
        save: {
          url: '/api/mdm/sop/hazardFactor'
        },
        delete: {
          url: '/api/mdm/sop/hazardFactor'
        }
      },
      reason: {
        save: {
          url: '/api/mdm/sop/sop'
        },
        update: {
          url: '/api/mdm/sop/sop'
        },
        delete: {
          url: '/api/mdm/sop/sop'
        }
      },
      mm: {
        insert: {
          url: '/api/mdm/sop/mm'
        },
        delete: {
          url: '/api/mdm/sop/mm'
        }
      },
      chem: {
        insert: {
          url: '/api/mdm/sop/chem'
        },
        delete: {
          url: '/api/mdm/sop/chem'
        }
      }
    },
    equipment: {
      info: {
        insert: {
          url: '/api/mdm/fim/equipment'
        },
        update: {
          url: '/api/mdm/fim/equipment'
        },
        delete: {
          url: '/api/mdm/fim/equipment'
        }
      },
      spec: {
        save: {
          url: '/api/mdm/fim/equipment/spec'
        },
        delete: {
          url: '/api/mdm/fim/equipment/spec'
        }
      },
      material: {
        save: {
          url: '/api/mdm/fim/equipment/material'
        },
        delete: {
          url: '/api/mdm/fim/equipment/material'
        }
      },
      rank: {
        save: {
          url: '/api/mdm/fim/equipment/rank'
        }
      },
      class: {
        insert: {
          url: '/api/mdm/equipment/class'
        },
        update: {
          url: '/api/mdm/equipment/class'
        },
        insItem: {
          insert: {
            url: '/api/mdm/equipment/class/insitem'
          },
          update: {
            url: '/api/mdm/equipment/class/insitem'
          },
          delete: {
            url: '/api/mdm/equipment/class/insitem'
          }
        },
        daily: {
          save: {
            url: '/api/mdm/fim/equipment/daily'
          },
          delete: {
            url: '/api/mdm/fim/equipment/daily'
          }
        },
        infoItem: {
          insert: {
            url: '/api/mdm/equipment/class/infoitem'
          },
          update: {
            url: '/api/mdm/equipment/class/infoitem'
          },
          delete: {
            url: '/api/mdm/equipment/class/infoitem'
          }
        },
        item: {
          daily: {
            save: {
              url: '/api/mdm/equipment/daily/item'
            },
            delete: {
              url: '/api/mdm/equipment/daily/item'
            }
          },
          insert: {
            url: '/api/mdm/equipment/class/item'
          },
          delete: {
            url: '/api/mdm/equipment/class/item'
          }
        }
      },
      spareParts: {
        insert: {
          url: '/api/mdm/equipment/spareparts'
        },
        delete: {
          url: '/api/mdm/equipment/spareparts'
        }
      },
      item: {
        daily: {
          save: {
            url: '/api/mdm/equipment/daily/item'
          },
          delete: {
            url: '/api/mdm/equipment/daily/item'
          }
        }
      }
    },
    senior: {
      save: {
        url: '/api/mdm/senior/senior'
      },
      delete: {
        url: '/api/mdm/senior/senior'
      },
      status: {
        insert: {
          url: '/api/mdm/senior/status'
        },
        update: {
          url: '/api/mdm/senior/status'
        },
        delete: {
          url: '/api/mdm/senior/status/{0}'
        }
      }
    }
  },
  sai: {
    vendor: {
      safety: {
        plan: {
          insert: {
            url: '/api/sai/vendor/safety/plan'
          },
          update: {
            url: '/api/sai/vendor/safety/plan'
          },
          delete: {
            url: '/api/sai/vendor/safety/plan/{0}'
          },
          calamit: {
            url: '/api/sai/vendor/safety/plan/calamit/del'
          }
        }
      }
    },
    joint: {
      insert: {
        url: '/api/sai/joint/inspection'
      },
      update: {
        url: '/api/sai/joint/inspection'
      },
      complete: {
        url: '/api/sai/joint/inspection/complete'
      },
      delete: {
        url: '/api/sai/joint/inspection/{0}',
        inner: '/api/sai/joint/inspection/delete/inner',
        outer: '/api/sai/joint/inspection/delete/outer',
        vendor: '/api/sai/joint/inspection/delete/vendor',
        result: '/api/sai/joint/inspection/delete/result'
      },
      item: {
        insert: {
          url: '/api/sai/joint/inspection/item'
        },
        delete: {
          url: '/api/sai/joint/inspection/delete/item'
        }
      }
    },
    budget: {
      item: {
        save: {
          url: '/api/sai/budget/item'
        },
        delete: {
          url: '/api/sai/budget/item'
        }
      },
      year: {
        insert: {
          url: '/api/sai/budget/year'
        },
        update: {
          url: '/api/sai/budget/year'
        },
        delete: {
          url: '/api/sai/budget/year/{0}'
        },
        complete: {
          url: '/api/sai/budget/year/complete'
        }
      },
      result: {
        insert: {
          url: '/api/sai/budget/result'
        },
        update: {
          url: '/api/sai/budget/result'
        },
        delete: {
          url: '/api/sai/budget/result/{0}'
        },
        complete: {
          url: '/api/sai/budget/result/complete'
        }
      }
    },
    safetyHealthy: {
      insert: {
        url: '/api/sai/safetyHealthyTarget'
      },
      update: {
        url: '/api/sai/safetyHealthyTarget'
      },
      delete: {
        url: '/api/sai/safetyHealthyTarget/{0}'
      },
      result: {
        save: {
          url: '/api/sai/safetyHealthyTarget/result'
        },
        delete: {
          url: '/api/sai/safetyHealthyTarget/result'
        }
      },
      base: {
        save: {
          url: '/api/sai/safetyHealthy'
        },
        delete: {
          url: '/api/sai/safetyHealthy'
        },
        detail: {
          save: {
            url: '/api/sai/safetyHealthyDetail'
          }
        }
      }
    },
    mainsafetyHealthy: {
      insert: {
        url: '/api/main/safetyHealthyTarget'
      },
      update: {
        url: '/api/main/safetyHealthyTarget'
      },
      delete: {
        url: '/api/main/safetyHealthyTarget/{0}'
      },
      result: {
        save: {
          url: '/api/main/safetyHealthyTarget/result'
        },
        delete: {
          url: '/api/main/safetyHealthyTarget/result'
        }
      },
      base: {
        save: {
          url: '/api/main/safetyHealthy'
        },
        delete: {
          url: '/api/main/safetyHealthy'
        },
        detail: {
          save: {
            url: '/api/main/safetyHealthyDetail'
          }
        }
      }
    },
    evalTable: {
      complianceEvalTable: {
        insert: {
          url: '/api/sai/evalTable/complianceEvalTable'
        },
        update: {
          url: '/api/sai/evalTable/complianceEvalTable'
        },
        delete: {
          url: '/api/sai/evalTable/complianceEvalTable/{0}'
        },
        complete: {
          url: '/api/sai/evalTable/complianceEvalTable/complete'
        }
      }
    },
    lawRegister: {
      gubun: {
        save: {
          url: '/api/sai/law/master/lawRegister'
        },
        excel: {
          url: '/api/sai/law/master/lawRegister/excel'
        }
      },
      item: {
        insert: {
          url: '/api/sai/law/item/lawRegister'
        },
        update: {
          url: '/api/sai/law/item/lawRegister'
        }
      }
    },
    lawCheck: {
      check: {
        insert: {
          url: '/api/sai/law/lawCheck/check'
        },
        update: {
          url: '/api/sai/law/lawCheck/check'
        },
        delete: {
          url: '/api/sai/law/lawCheck/check/{0}'
        },
        complete: {
          url: '/api/sai/law/lawCheck/check/complete'
        }
      }
    },
    outernal: {
      result: {
        insert: {
          url: '/api/sai/outernalResult'
        },
        update: {
          url: '/api/sai/outernalResult'
        },
        delete: {
          url: '/api/sai/outernalResult/{0}'
        }
      }
    },
    internal: {
      base: {
        systemChecklist: {
          save: {
            url: '/api/sai/internal/base/checklistSystems'
          },
          excel: {
            url: '/api/sai/internal/base/checklistSystems/excel'
          }
        },
        checklist: {
          insert: {
            url: '/api/sai/internal/base/checklist'
          },
          update: {
            url: '/api/sai/internal/base/checklist'
          }
        }
      },
      yearPlan: {
        insert: {
          url: '/api/sai/internal/yearPlan'
        },
        update: {
          url: '/api/sai/internal/yearPlan'
        },
        delete: {
          url: '/api/sai/internal/yearPlan/{0}'
        }
      },
      action: {
        insert: {
          url: '/api/sai/internal/action/internalAction'
        },
        update: {
          url: '/api/sai/internal/action/internalAction'
        },
        delete: {
          url: '/api/sai/internal/action/internalAction/{0}'
        },
        checklistResult: {
          save: {
            url: '/api/sai/internal/action/internalChecklistResults'
          },
          delete: {
            url: '/api/sai/internal/action/internalChecklistResults'
          }
        }
      },
      targetDept: {
        update: {
          url: '/api/sai/internal/action/internalTargetDept'
        },
        action: {
          url: '/api/sai/internal/action/internalTargetDept/audit'
        },
        complete: {
          url: '/api/sai/internal/action/internalTargetDept/complete'
        }
      }
    },
    uninjury: {
      insert: {
        url: '/api/sai/uninjury/mstadd'
      },
      add: {
        url: '/api/sai/uninjury/mst'
      },
      update: {
        url: '/api/sai/uninjury/mst'
      },
      delete: {
        url: '/api/sai/uninjury/mst'
      },
      history: {
        url: '/api/sai/uninjury/history'
      }
    },
    tbm: {
      insert: {
        url: '/api/sai/tbm/tbm',
        attendee: {
          url: '/api/sai/tbm/attendee'
        },
        equip: {
          url: '/api/sai/tbm/equip',
          result: {
            url: '/api/sai/tbm/equip/result'
          }
        }
      },
      update: {
        url: '/api/sai/tbm/tbm'
      },
      delete: {
        url: '/api/sai/tbm/tbm/{0}',
        attendee: {
          url: '/api/sai/tbm/attendee'
        },
        equip: {
          url: '/api/sai/tbm/equip'
        }
      },
      complete: {
        url: '/api/sai/tbm/tbm/complete'
      },
      preComplete: {
        url: '/api/sai/tbm/pre/complete'
      }
    },
    hazard: {
      insert: {
        url: '/api/sai/hazard/hazard'
      },
      update: {
        url: '/api/sai/hazard/hazard'
      },
      dept: {
        delete: {
          url: '/api/sai/hazard/hazard/dept'
        }
      },
      substance: {
        save: {
          url: '/api/sai/hazard/hazard/substance'
        },
        delete: {
          url: '/api/sai/hazard/hazard/substance'
        }
      },
      master: {
        insert: {
          url: '/api/sai/hazard/hazard/master'
        },
        update: {
          url: '/api/sai/hazard/hazard/master'
        }
      }
    },
    workmeas: {
      plan: {
        insert: {
          url: '/api/sai/work/plan'
        },
        update: {
          url: '/api/sai/work/plan'
        },
        complete: {
          url: '/api/sai/work/plan/complete'
        },
        delete: {
          url: '/api/sai/work/plan/{0}'
        }
      },
      result: {
        insert: {
          url: '/api/sai/work/result'
        },
        update: {
          url: '/api/sai/work/result'
        },
        delete: {
          url: '/api/sai/work/result'
        }
      },
      results: {
        insert: {
          url: '/api/sai/work/results'
        }
      }
    },
    osh: {
      proceedings: {
        insert: {
          url: '/api/sai/osh/proceedings'
        },
        update: {
          url: '/api/sai/osh/proceedings'
        },
        delete: {
          url: '/api/sai/osh/proceedings/{0}'
        }
      }
    },
    shm: {
      policy: {
        insert: {
          url: '/api/sai/shm/policy',
          comment: {
            url: '/api/sai/shm/policy/comment'
          }
        },
        update: {
          url: '/api/sai/shm/policy',
          comment: {
            url: '/api/sai/shm/policy/comment'
          }
        },
        delete: {
          url: '/api/sai/shm/policy/{0}',
          comment: {
            url: '/api/sai/shm/policy/comment/{0}/{1}'
          }
        },
        insertlog: {
          url: '/api/sai/shm/policy/log'
        },
        itemdelete: {
          url: '/api/sai/shm/policy/item/delete'
        }
      }
    },
    iso: {
      report: {
        insert: {
          url: '/api/sai/iso/report'
        },
        update: {
          url: '/api/sai/iso/report'
        },
        delete: {
          url: '/api/sai/iso/report/{0}'
        }
      },
      document: {
        insert: {
          url: '/api/sai/iso/document'
        },
        update: {
          url: '/api/sai/iso/document'
        },
        delete: {
          url: '/api/sai/iso/document/{0}'
        }
      }
    },
    sob: {
      board: {
        insert: {
          url: '/api/sai/sob/board'
        },
        update: {
          url: '/api/sai/sob/board'
        },
        delete: {
          url: '/api/sai/sob/board/{0}'
        }
      }
    },
    patrol: {
      resultItem: {
        insert: {
          url: '/api/sai/patrol/result/item',
          mst: '/api/sai/patrol/result/itemMst'
        },
        delete: {
          url: '/api/sai/patrol/result/item',
          mst: '/api/sai/patrol/result/itemMst'
        }
      },
      insert: {
        url: '/api/sai/ptl/patrol'
      },
      update: {
        url: '/api/sai/ptl/patrol'
      },
      delete: {
        url: '/api/sai/ptl/patrol/{0}'
      }
    },
    patrolvendor: {
      resultItem: {
        insert: {
          url: '/api/sai/patrol/vendor/result/item'
        },
        delete: {
          url: '/api/sai/patrol/vendor/result/item'
        }
      },
      insert: {
        url: '/api/sai/patrol/vendor/patrol'
      },
      update: {
        url: '/api/sai/patrol/vendor/patrol'
      },
      delete: {
        url: '/api/sai/patrol/vendor/patrol/{0}'
      },
      complete: {
        url: '/api/sai/patrol/vendor/patrol/complete'
      },
      improve: {
        update: {
          url: '/api/sai/patrol/vendor/patrol/improve'
        },
        delete: {
          url: '/api/sai/patrol/vendor/patrol/improve'
        }
      }
    },
    sse: {
      selfEvaluation: {
        insert: {
          url: '/api/sai/sse/selfEvaluation'
        },
        update: {
          url: '/api/sai/sse/selfEvaluation'
        },
        delete: {
          url: '/api/sai/sse/selfEvaluation/{0}'
        }
      },
      selfEvaluationTableItem: {
        save: {
          url: '/api/sai/sse/selfEvaluationTableItems'
        }
      },
      selfEvaluationClassInnerStandard: {
        save: {
          url: '/api/sai/sse/selfEvaluationClassInnerStandards'
        }
      }
    }
  },
  hea: {
    ihj: {
      insert: {
        url: '/api/hea/ihj/industryHealthJournal'
      },
      update: {
        url: '/api/hea/ihj/industryHealthJournal'
      },
      delete: {
        url: '/api/hea/ihj/industryHealthJournal/{0}'
      }
    },
    bcs: {
      survey: {
        insert: {
          url: '/api/hea/bcs/brainCardiovascular/survey'
        },
        update: {
          url: '/api/hea/bcs/brainCardiovascular/survey'
        },
        delete: {
          url: '/api/hea/bcs/brainCardiovascular/surveie/{0}'
        }
      },
      riskAssessment: {
        insert: {
          url: '/api/hea/bcs/brainCardiovascular/riskAssessment'
        }
      },
      workSuitEval: {
        update: {
          url: '/api/hea/bcs/brainCardiovascular/workSuitEval'
        },
        step: {
          url: '/api/hea/bcs/brainCardiovascular/workSuitEval/step'
        }
      },
      postProcessing: {
        step: {
          url: '/api/hea/bcs/brainCardiovascular/postProcessing/step'
        }
      },
      evalItem: {
        save: {
          url: '/api/hea/bcs/brainCardiovascular/evalItem'
        }
      }
    },
    closedspaceMap: {
      save: {
        url: '/api/hea/closedspaceMap'
      },
      delete: {
        url: '/api/hea/closedspaceMap'
      }
    },
    temp: {
      cafe: {
        order: {
          save: {
            url: '/api/hea/temp/order/coffeeOrder'
          }
        },
        takeOrder: {
          insert: {
            url: '/api/hea/temp/takeOrder/coffeeTakeOrder'
          },
          update: {
            url: '/api/hea/temp/takeOrder/coffeeTakeOrder'
          },
          delete: {
            url: '/api/hea/temp/takeOrder/coffeeTakeOrder/{0}'
          }
        }
      }
    },
    jobStress: {
      plan: {
        insert: {
          url: '/api/hea/jss/jobStressPlan'
        },
        update: {
          url: '/api/hea/jss/jobStressPlan'
        },
        delete: {
          url: '/api/hea/jss/jobStressPlan/{0}'
        }
      },
      user: {
        save: {
          url: '/api/hea/jss/jobStress/assessUser'
        }
      },
      base: {
        item: {
          save: {
            url: '/api/hea/jss/base/jobStressItem'
          }
        }
      }
    },
    muscleSystem: {
      investigationPlan: {
        insert: {
          url: '/api/hea/mss/investigationPlan'
        },
        update: {
          url: '/api/hea/mss/investigationPlan'
        },
        delete: {
          url: '/api/hea/mss/investigationPlan/{0}'
        },
        complete: {
          url: '/api/hea/mss/investigationPlan/complete'
        }
      },
      muscleSop: {
        save: {
          url: '/api/hea/mss/muscleSops'
        },
        update: {
          url: '/api/hea/mss/muscleSop'
        },
        delete: {
          url: '/api/hea/mss/muscleSop'
        },
        complete: {
          url: '/api/hea/mss/muscleSop/complete'
        }
      },
      muscleHeavyWork: {
        save: {
          url: '/api/hea/mss/muscleHeavyWorks'
        },
        delete: {
          url: '/api/hea/mss/muscleHeavyWorks'
        },
        savedelete: {
          url: '/api/hea/mss/muscleHeavyWork/all'
        }
      },
      muscleSopHazard: {
        save: {
          url: '/api/hea/mss/muscleSopHazard'
        },
        delete: {
          url: '/api/hea/mss/muscleSopHazard'
        }
      },
      muscleSopResult: {
        save: {
          url: '/api/hea/mss/muscleSopResult'
        },
        delete: {
          url: '/api/hea/mss/muscleSopResult'
        }
      },
      muscleSurvey: {
        update: {
          url: '/api/hea/mss/muscleSurvey'
        },
        complete: {
          url: '/api/hea/mss/muscleSurvey/complete'
        },
        cancel: {
          url: '/api/hea/mss/muscleSurvey/cancel'
        }
      }
    },
    heavyWork: {
      insert: {
        url: '/api/hea/base/insertHeavyWork'
      },
      update: {
        url: '/api/hea/base/updateHeavyWork'
      }
    },
    disease: {
      save: {
        url: '/api/hea/checkup/disease'
      },
      delete: {
        url: '/api/hea/checkup/disease'
      }
    },
    examine: {
      save: {
        url: '/api/hea/checkup/examine'
      },
      delete: {
        url: '/api/hea/checkup/examine'
      },
      tempUploadSave: {
        url: '/api/hea/checkup/examine/tempUpload'
      },
      tempUploadDelete: {
        url: '/api/hea/checkup/examine/tempUpload'
      },
      resultUpload: {
        url: '/api/hea/checkup/examine/resultUpload'
      }
    },
    opinion: {
      tempUploadSave: {
        url: '/api/hea/checkup/opinion/tempUpload'
      },
      tempUploadDelete: {
        url: '/api/hea/checkup/opinion/tempUpload'
      },
      resultUpload: {
        url: '/api/hea/checkup/opinion/resultUpload'
      }
    },
    hospital: {
      save: {
        url: '/api/hea/checkup/hospital'
      },
      delete: {
        url: '/api/hea/checkup/hospital'
      }
    },
    medicine: {
      save: {
        url: '/api/hea/checkup/medicine'
      },
      delete: {
        url: '/api/hea/checkup/medicine'
      }
    },
    checkup: {
      plan: {
        insert: {
          url: '/api/hea/checkup/plan'
        },
        update: {
          url: '/api/hea/checkup/plan'
        },
        delete: {
          url: '/api/hea/checkup/plan/{0}'
        }
      },
      result: {
        insert: {
          url: '/api/hea/checkup/result'
        },
        update: {
          url: '/api/hea/checkup/result'
        },
        delete: {
          url: '/api/hea/checkup/result/{0}'
        }
      },
      reserve: {
        insert: {
          url: '/api/hea/checkup/reserve'
        },
        update: {
          url: '/api/hea/checkup/reserve'
        },
        delete: {
          url: '/api/hea/checkup/reserve/{0}'
        }
      },
      implementation: {
        save: {
          url: '/api/hea/checkup/implementation'
        }
      },
      results: {
        save: {
          url: '/api/hea/checkup/results'
        },
        delete: {
          url: '/api/hea/checkup/results/{0}'
        }
      },
      opinions: {
        save: {
          url: '/api/hea/checkup/opinions'
        },
        delete: {
          url: '/api/hea/checkup/opinions/{0}'
        }
      },
      status: {
        save: {
          url: '/api/hea/checkup/status/results'
        }
      },
      suspect: {
        user: {
          save: {
            url: '/api/hea/suspect/user'
          },
          release: {
            url: '/api/hea/suspect/release'
          },
          delete: {
            url: '/api/hea/suspect/user/{0}'
          },
          deletes: {
            url: '/api/hea/suspect/users'
          }
        },
        consult: {
          insert: {
            url: '/api/hea/suspect/consult'
          },
          update: {
            url: '/api/hea/suspect/consult'
          },
          delete: {
            url: '/api/hea/suspect/consult/{0}'
          }
        }
      },
      night: {
        save: {
          url: '/api/hea/checkup/night'
        }
      }
    },
    cse: {
      gives: {
        insert: {
          url: '/api/hea/cse/closed/give'
        },
        update: {
          url: '/api/hea/cse/closed/give'
        },
        returnUpdate: {
          url: '/api/hea/cse/closed/return'
        },
        delete: {
          url: '/api/hea/cse/closed/give/{0}'
        },
        complete: {
          url: '/api/hea/cse/closed/give/complete'
        },
        rent: {
          url: '/api/hea/cse/closed/give/rent'
        },
        return: {
          url: '/api/hea/cse/closed/give/return'
        },
        deleteItem: {
          url: '/api/hea/cse/closed/give/item/{0}'
        },
        status: {
          rent: {
            url: '/api/hea/cse/closed/status/rent'
          }
        }
      },
      equip: {
        save: {
          url: '/api/hea/cse/closed/equip'
        }
      }
    },
    sih: {
      check: {
        insert: {
          url: '/api/hea/site/journal'
        },
        update: {
          url: '/api/hea/site/journal'
        },
        delete: {
          url: '/api/hea/site/journal/{0}'
        }
      },
      item: {
        insert: {
          url: '/api/hea/site/item'
        },
        delete: {
          url: '/api/hea/site/item'
        }
      }
    }
  },
  env: {
    facility: {
      insert: {
        url: '/api/env/hcf/facility'
      },
      update: {
        url: '/api/env/hcf/facility'
      }
    },
    facilityInspectionClass: {
      save: {
        url: '/api/env/hcf/facility/inspectionClass'
      }
    },
    facilityCheckItem: {
      save: {
        url: '/api/env/hcf/facility/checkItem'
      }
    },
    facilitySelfCheck: {
      insert: {
        url: '/api/env/hcf/facility/selfCheck'
      },
      update: {
        url: '/api/env/hcf/facility/selfCheck'
      },
      complete: {
        url: '/api/env/hcf/facility/complete/selfCheck'
      },
      delete: {
        url: '/api/env/hcf/facility/selfCheck/{0}'
      }
    },
    facilitySelfCheckItem: {
      save: {
        url: '/api/env/hcf/facility/selfCheckItem'
      }
    },
    gov: {
      mst: {
        insert: {
          url: '/api/env/gov/sch/mst'
        },
        update: {
          url: '/api/env/gov/sch/mst'
        }
      },
      user: {
        delete: {
          url: '/api/env/gov/sch/mst'
        }
      },
      history: {
        save: {
          url: '/api/env/gov/sch/history'
        },
        delete: {
          url: '/api/env/gov/sch/history'
        }
      }
    },
    water: {
      trust: {
        insert: {
          url: '/api/env/water/trust'
        },
        update: {
          url: '/api/env/water/trust'
        },
        delete: {
          url: '/api/env/water/trust/{0}'
        },
        deleteAll: {
          url: '/api/env/water/trust'
        }
      },
      self: {
        measure: {
          insert: {
            url: '/api/env/water/self/measure'
          },
          update: {
            url: '/api/env/water/self/measure'
          },
          delete: {
            url: '/api/env/water/self/measure/{0}'
          }
        },
        measureloc: {
          save: {
            url: '/api/env/water/self/measure/measureloc'
          }
        }
      },
      entrust: {
        result: {
          insert: {
            url: '/api/env/water/entrust/result'
          },
          update: {
            url: '/api/env/water/entrust/result'
          },
          delete: {
            url: '/api/env/water/entrust/result/{0}'
          }
        }
      },
      daily: {
        result: {
          insert: {
            url: '/api/env/water/daily/result'
          },
          update: {
            url: '/api/env/water/daily/result'
          },
          delete: {
            url: '/api/env/water/daily/result/{0}'
          }
        },
        additive: {
          save: {
            url: '/api/env/water/daily/result/additive'
          },
          delete: {
            url: '/api/env/water/daily/result/additive'
          }
        },
        aerationtank: {
          save: {
            url: '/api/env/water/daily/result/aerationtank'
          },
          delete: {
            url: '/api/env/water/daily/result/aerationtank'
          }
        },
        discharge: {
          save: {
            url: '/api/env/water/daily/result/discharge'
          },
          delete: {
            url: '/api/env/water/daily/result/discharge'
          }
        },
        diswater: {
          save: {
            url: '/api/env/water/daily/result/diswater'
          },
          delete: {
            url: '/api/env/water/daily/result/diswater'
          }
        },
        drug: {
          save: {
            url: '/api/env/water/daily/result/drug'
          },
          delete: {
            url: '/api/env/water/daily/result/drug'
          }
        },
        guidance: {
          save: {
            url: '/api/env/water/daily/result/guidance'
          },
          delete: {
            url: '/api/env/water/daily/result/guidance'
          }
        },
        measure: {
          save: {
            url: '/api/env/water/daily/result/measure'
          },
          delete: {
            url: '/api/env/water/daily/result/measure'
          }
        },
        preventive: {
          save: {
            url: '/api/env/water/daily/result/preventive'
          },
          delete: {
            url: '/api/env/water/daily/result/preventive'
          }
        },
        sludge: {
          save: {
            url: '/api/env/water/daily/result/sludge'
          },
          delete: {
            url: '/api/env/water/daily/result/sludge'
          }
        },
        supwater: {
          save: {
            url: '/api/env/water/daily/result/supwater'
          },
          delete: {
            url: '/api/env/water/daily/result/supwater'
          }
        },
        user: {
          save: {
            url: '/api/env/water/daily/result/user'
          },
          delete: {
            url: '/api/env/water/daily/result/user'
          }
        },
        wattmeter: {
          save: {
            url: '/api/env/water/daily/result/wattmeter'
          },
          delete: {
            url: '/api/env/water/daily/result/wattmeter'
          }
        }
      },
      mst: {
        preventive: {
          insert: {
            url: '/api/env/water/mst/preventive'
          },
          update: {
            url: '/api/env/water/mst/preventive'
          },
          delete: {
            url: '/api/env/water/mst/preventive/{0}'
          },
          breakdown: {
            save: {
              url: '/api/env/water/mst/preventive/breakdowns'
            },
            deletes: {
              url: '/api/env/water/mst/preventive/breakdowns'
            },
            insert: {
              url: '/api/env/water/mst/preventive/breakdown'
            },
            update: {
              url: '/api/env/water/mst/preventive/breakdown'
            },
            delete: {
              url: '/api/env/water/mst/preventive/breakdown/{0}'
            }
          }
        },
        discharge: {
          insert: {
            url: '/api/env/water/mst/discharge'
          },
          update: {
            url: '/api/env/water/mst/discharge'
          },
          delete: {
            url: '/api/env/water/mst/discharge/{0}'
          }
        },
        wattmeter: {
          insert: {
            url: '/api/env/water/mst/wattmeter'
          },
          update: {
            url: '/api/env/water/mst/wattmeter'
          },
          delete: {
            url: '/api/env/water/mst/wattmeter/{0}'
          }
        },
        diswater: {
          insert: {
            url: '/api/env/water/mst/diswater'
          },
          update: {
            url: '/api/env/water/mst/diswater'
          },
          delete: {
            url: '/api/env/water/mst/diswater/{0}'
          }
        },
        supwater: {
          insert: {
            url: '/api/env/water/mst/supwater'
          },
          update: {
            url: '/api/env/water/mst/supwater'
          },
          delete: {
            url: '/api/env/water/mst/supwater/{0}'
          }
        },
        measureloc: {
          insert: {
            url: '/api/env/water/mst/measureloc'
          },
          update: {
            url: '/api/env/water/mst/measureloc'
          },
          delete: {
            url: '/api/env/water/mst/measureloc/{0}'
          }
        },
        additive: {
          insert: {
            url: '/api/env/water/mst/additive'
          },
          update: {
            url: '/api/env/water/mst/additive'
          },
          delete: {
            url: '/api/env/water/mst/additive/{0}'
          }
        },
        drug: {
          insert: {
            url: '/api/env/water/mst/drug'
          },
          update: {
            url: '/api/env/water/mst/drug'
          },
          delete: {
            url: '/api/env/water/mst/drug/{0}'
          }
        },
        aerationtank: {
          insert: {
            url: '/api/env/water/mst/aerationtank'
          },
          update: {
            url: '/api/env/water/mst/aerationtank'
          },
          delete: {
            url: '/api/env/water/mst/aerationtank/{0}'
          }
        },
        inspect: {
          save: {
            url: '/api/env/water/mst/inspect'
          },
          plant: {
            save: {
              url: '/api/env/water/mst/inspect/plant'
            },
            delete: {
              url: '/api/env/water/mst/inspect/plant'
            }
          }
        }
      }
    },
    waste: {
      mst: {
        insert: {
          url: '/api/env/waste/mst'
        },
        update: {
          url: '/api/env/waste/mst'
        },
        sub: {
          url: '/api/env/waste/mst/sub'
        }
      },
      volume: {
        insert: {
          url: '/api/env/waste/volume'
        },
        update: {
          url: '/api/env/waste/volume'
        },
        delete: {
          url: '/api/env/waste/volume/{0}'
        }
      },
      allbaro: {
        insert: {
          url: '/api/env/waste/allbaro'
        },
        update: {
          url: '/api/env/waste/allbaro'
        },
        delete: {
          url: '/api/env/waste/allbaro/{0}'
        },
        excel: {
          url: '/api/env/waste/allbaro/excel'
        }
      }
    },
    air: {
      daily: {
        result: {
          insert: {
            url: '/api/env/air/daily/result'
          },
          update: {
            url: '/api/env/air/daily/result'
          },
          delete: {
            url: '/api/env/air/daily/result/{0}'
          }
        },
        outlet: {
          save: {
            url: '/api/env/air/daily/result/outlet'
          },
          delete: {
            url: '/api/env/air/daily/result/outlet'
          }
        },
        preventive: {
          save: {
            url: '/api/env/air/daily/result/preventive'
          },
          delete: {
            url: '/api/env/air/daily/result/preventive'
          },
          history: {
            save: {
              url: '/api/env/air/daily/result/preventive/history'
            },
            delete: {
              url: '/api/env/air/daily/result/preventive/history'
            }
          }
        },
        fuel: {
          save: {
            url: '/api/env/air/daily/result/fuel'
          },
          delete: {
            url: '/api/env/air/daily/result/fuel'
          }
        },
        material: {
          save: {
            url: '/api/env/air/daily/result/material'
          },
          delete: {
            url: '/api/env/air/daily/result/material'
          }
        }
      },
      mst: {
        outlet: {
          insert: {
            url: '/api/env/air/mst/outlet'
          },
          update: {
            url: '/api/env/air/mst/outlet'
          },
          discharge: {
            save: {
              url: '/api/env/air/mst/outlet/discharge'
            },
            delete: {
              url: '/api/env/air/mst/outlet/discharge'
            }
          },
          part: {
            save: {
              url: '/api/env/air/mst/outlet/part'
            },
            delete: {
              url: '/api/env/air/mst/outlet/part'
            }
          },
          inspect: {
            save: {
              url: '/api/env/air/mst/outlet/inspect'
            },
            delete: {
              url: '/api/env/air/mst/outlet/inspect'
            }
          }
        },
        discharge: {
          insert: {
            url: '/api/env/air/mst/discharge'
          },
          update: {
            url: '/api/env/air/mst/discharge'
          },
          delete: {
            url: '/api/env/air/mst/discharge/{0}'
          },
          fuel: {
            insert: {
              url: '/api/env/air/mst/discharge/fuel'
            },
            delete: {
              url: '/api/env/air/mst/discharge/fuel'
            }
          }
        },
        preventive: {
          insert: {
            url: '/api/env/air/mst/preventive'
          },
          update: {
            url: '/api/env/air/mst/preventive'
          },
          delete: {
            url: '/api/env/air/mst/preventive/{0}'
          }
        },
        fuel: {
          insert: {
            url: '/api/env/air/mst/fuel'
          },
          update: {
            url: '/api/env/air/mst/fuel'
          },
          delete: {
            url: '/api/env/air/mst/fuel/{0}'
          }
        },
        material: {
          insert: {
            url: '/api/env/air/mst/material'
          },
          update: {
            url: '/api/env/air/mst/material'
          },
          delete: {
            url: '/api/env/air/mst/material/{0}'
          }
        },
        drug: {
          insert: {
            url: '/api/env/air/mst/drug'
          },
          update: {
            url: '/api/env/air/mst/drug'
          },
          delete: {
            url: '/api/env/air/mst/drug/{0}'
          }
        },
        wattmeter: {
          insert: {
            url: '/api/env/air/mst/wattmeter'
          },
          update: {
            url: '/api/env/air/mst/wattmeter'
          },
          delete: {
            url: '/api/env/air/mst/wattmeter/{0}'
          }
        },
        inspect: {
          save: {
            url: '/api/env/air/mst/inspect'
          },
          plant: {
            save: {
              url: '/api/env/air/mst/inspect/plant'
            },
            delete: {
              url: '/api/env/air/mst/inspect/plant'
            }
          }
        },
        history: {
          save: {
            url: '/api/env/air/mst/outlet/part/history'
          },
          delete: {
            url: '/api/env/air/mst/outlet/part/history'
          }
        }
      },
      self: {
        measure: {
          insert: {
            url: '/api/env/air/self/measure'
          },
          update: {
            url: '/api/env/air/self/measure'
          },
          delete: {
            url: '/api/env/air/self/measure/{0}'
          }
        },
        outlet: {
          save: {
            url: '/api/env/air/self/measure/outlet'
          }
        }
      }
    }
  },
  chm: {
    base: {
      dangerItem: {
        save: {
          url: '/api/chm/base/dangerItem'
        }
      },
      chemBase: {
        insert: {
          url: '/api/mdm/mam/chem/chemBase'
        },
        update: {
          url: '/api/mdm/mam/chem/chemBase'
        }
      },
      chemBaseColumnSetting: {
        save: {
          url: '/api/mdm/mam/chem/chemBase/columnSetting'
        }
      }
    },
    db: {
      regulDbUpload: {
        upload: {
          url: '/api/chm/db/regulDbUpload'
        },
        valid: {
          url: '/api/chm/db/regulDbUpload/valid'
        },
        same: {
          url: '/api/chm/db/regulDbUpload/sameFile'
        },
        chemHistory: {
          url: '/api/chm/db/regulDbUpload/chemHistory'
        },
        chemRegulHistory: {
          url: '/api/chm/db/regulDbUpload/chemRegulHistory'
        },
        delete: {
          url: '/api/chm/db/regulDbUpload/{0}'
        },
        accept: {
          url: '/api/chm/db/regulDbUpload/accept'
        }
      },
      regulDbUploadDetail: {
        upload: {
          url: '/api/chm/db/regulDbUploadDetail'
        }
      }
    },
    facilityStatusTable: {
      insert: {
        url: '/api/chm/facilityStatusTable'
      },
      update: {
        url: '/api/chm/facilityStatusTable'
      },
      delete: {
        url: '/api/chm/facilityStatusTable'
      },
      hazard: {
        save: {
          url: '/api/chm/facilityStatusTable/hazard'
        },
        delete: {
          url: '/api/chm/facilityStatusTable/hazard'
        }
      }
    },
    danger: {
      master: {
        insert: {
          url: '/api/chm/danger/master'
        },
        update: {
          url: '/api/chm/danger/master'
        }
      },
      item: {
        save: {
          url: '/api/chm/danger/master/item'
        },
        delete: {
          url: '/api/chm/danger/master/item'
        }
      },
      map: {
        save: {
          url: '/api/chm/danger/map'
        },
        delete: {
          url: '/api/chm/danger/map'
        }
      },
      fireFighting: {
        save: {
          url: '/api/chm/danger/master/fireFighting'
        },
        delete: {
          url: '/api/chm/danger/master/fireFighting'
        }
      },
      journal: {
        insert: {
          url: '/api/chm/danger/journal'
        },
        update: {
          url: '/api/chm/danger/journal'
        },
        delete: {
          url: '/api/chm/danger/journal/{0}'
        }
      },
      masterItem: {
        save: {
          url: '/api/chm/danger/master/checkItem'
        }
      },
      regularCheck: {
        insert: {
          url: '/api/chm/danger/regular/check'
        },
        update: {
          url: '/api/chm/danger/regular/check'
        },
        complete: {
          url: '/api/chm/danger/regular/complete'
        },
        delete: {
          url: '/api/chm/danger/regular/check/{0}'
        }
      }
    },
    inout: {
      save: {
        url: '/api/chm/inoutManage'
      },
      saveall: {
        url: '/api/chm/inoutManageAll'
      },
      delete: {
        url: '/api/chm/inoutManage'
      }
    },
    save: {
      save: {
        url: '/api/chm/saveManage'
      },
      delete: {
        url: '/api/chm/saveManage'
      }
    },
    knowhow: {
      insert: {
        url: '/api/chm/knowhow'
      },
      update: {
        url: '/api/chm/knowhow'
      },
      delete: {
        url: '/api/chm/knowhow/{0}'
      }
    },
    summary: {
      insert: {
        url: '/api/chm/summary'
      },
      update: {
        url: '/api/chm/summary'
      },
      delete: {
        url: '/api/chm/summary/{0}'
      }
    }
  },
  smf: {
    usePlan: {
      insert: {
        url: '/api/smf/usePlan'
      },
      update: {
        url: '/api/smf/usePlan'
      },
      delete: {
        url: '/api/smf/usePlan/{0}'
      }
    },
    monthlyPerformance: {
      insert: {
        url: '/api/smf/monthlyPerformance'
      },
      update: {
        url: '/api/smf/monthlyPerformance'
      },
      delete: {
        url: '/api/smf/monthlyPerformance/{0}'
      }
    },
    monthlyPerformanceVendor: {
      permit: {
        url: '/api/smf/monthlyPerformanceVendor/permit'
      },
      save: {
        url: '/api/smf/monthlyPerformanceVendor'
      },
      delete: {
        url: '/api/smf/monthlyPerformanceVendor'
      }
    }
  }
}

export default transactionConfig
