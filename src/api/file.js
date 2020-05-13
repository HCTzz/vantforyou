import request from '@/utils/request'
import {serverPath} from '@/settings'
import qs from 'qs'

export function getFileList(data) {
    return request({
        url: '/sysFile/filelist',
        method: 'get',
        params: data
      })
}

export function addFolder(data) {
    return request({
        headers: { 'Content-Type': 'application/json' },
        url: '/sysFile/addFolder',
        method: 'post',
        data: JSON.stringify(data)
      })
}

export function getFile(fileKey) {
    return request({
        url: '/sysFile/getFile',
        method: 'get',
        params: { fileKey }
      })
}

export function deleteFile(fileKey) {
  return request({
    url: '/sysFile/deleteFile',
    method: 'delete',
    params: { fileKey }
  })
}

export function downloadFile(fileKey) {
  window.location.href = serverPath + '/sysFile/downloadFile?fileKey='+fileKey;
  // return request({
  //   url: '/sysFile/downloadFile',
  //   method: 'post',
  //   responseType: 'blob',
  //   params: { fileKey }
  // })
}
