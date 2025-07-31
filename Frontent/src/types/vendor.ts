import { dataBaseType } from '@/types/dataBase'

export interface vendorType extends dataBaseType {
  vendorCd: stringNull
  vendorName: stringNull
  vendorClassCd?: stringNull
  vendorClassName?: stringNull
  vendorTypeCd?: stringNull
  vendorTypeName?: stringNull
  address?: stringNull
  bizNo: stringNull
  chargeDeptCd?: stringNull
  phoneNo?: stringNull
  email?: stringNull
  chargeName?: stringNull
  representName?: stringNull
  portalConnFlag: stringNull
  portalId: stringNull
  portalPw: stringNull
  portalOriginalPw: stringNull
  useFlag: stringNull
  plantCds: stringNull
  plantNames: stringNull
}
