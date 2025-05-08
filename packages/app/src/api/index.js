import http from "./http";

/**
 * @description: oss上传文档之后，保存文档的接口
 * @param {*} data
 * @return {*}
 */
const uploadSaveDocToRms = (data) => {
  return http({
    url: `/tbc-rms/video/saveDocument`,
    method: "post",
    data,
  });
};

/*
  保存火山云视频点播媒资上传信息
  */
const saveVolcanicUploadInfo = (data) => {
  return http({
    url: "/tbc-rms/video/saveVolcanicUploadInfo",
    method: "post",
    data,
  });
};

const uploadSaveToRms = (data) => {
  return http({
    url: `/tbc-rms/resource/uploadSaveToRms`,
    method: "post",
    data,
  });
};

/**
 * @description: 查询上传资源的上传信息 查询转码状态
 * @return {*}
 * @param {*} params
 */
const getResourceInfo = (params) => {
  return http({
    url: `/tbc-rms/resource/getResourceInfo`,
    method: "get",
    params,
  });
};

/**
 * 获取当前企业使用的视频点播服务供应商
 *
 */
const getEnabledVod = () => {
  return http({
    url: '/tbc-rms/video/getEnabledVod',
    method: "post",
  });
};


  /**
  * 检查返回播放凭证或者sourceUrl
  * @param resourceRelId
  */
  const getVideoPlayAuthForPC = (data) =>{
    return http({
        url: "/biz-oim/tbcrmsV2/getVideoPlayAuthForPC",
        method: "post",
        data
    })
  }

  const APIgetTokenForHls = (data) =>{
    return http({
        url: "/tbc-rms/video/getTokenForHls",
        method: "post",
        data
    })
  }

  const toDeleteFile = (data) => {
    return http({
      url: "/tbc-rms/manager/deleteFileAndFolder",
      method: "post",
      data
    })
  }

export {
  uploadSaveDocToRms,
  saveVolcanicUploadInfo,
  uploadSaveToRms,
  getResourceInfo,
  getEnabledVod,
  getVideoPlayAuthForPC,
  APIgetTokenForHls,
  toDeleteFile
};
