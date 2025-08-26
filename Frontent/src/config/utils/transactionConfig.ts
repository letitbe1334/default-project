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
      changepw: {
        url: '/api/auth/user/changepw'
      },
      nextChangePw: {
        url: '/api/auth/user/nextChangePw'
      },
      signup: {
        url: '/api/auth/signup'
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
      userauth: {
        insert: {
          url: '/api/sys/auth/userauth'
        },
        delete: {
          url: '/api/sys/auth/userauth'
        }
      },
    }
  },
}

export default transactionConfig
