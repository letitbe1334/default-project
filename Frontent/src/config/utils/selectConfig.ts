/**
 * 조회용 config
 */
const selectConfig = {
  auth: {
    login: {
      refresh: {
        url: '/api/auth/refresh'
      },
    },
    member: {
      url: '/api/auth/member/info',
      depts: {
        url: '/api/auth/user/info/depts'
      },
      users: {
        url: '/api/auth/user/info/users'
      },
      vendors: {
        url: '/api/auth/user/info/vendors'
      }
    },
    menu: {
      list: {
        url: '/api/auth/member/menus'
      },
    }
  },
  language: {
    generatorJson: {
      url: '/api/lang/message/json'
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
        get: {
          url: '/api/sys/code/mst/{0}/{1}'
        }
      }
    },
    stepper: {
      mst: {
        list: {
          url: '/api/sys/stepper/msts/{0}'
        },
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
      user: {
        list: {
          url: '/api/sys/auth/users'
        }
      },
      userauth: {
        list: {
          url: '/api/sys/auth/userauths'
        }
      },
    }
  },
}

export default selectConfig
