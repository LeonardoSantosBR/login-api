import { IpaginationController } from "./Ipagination-controller";

export interface IpaginationService extends IpaginationController {
  limit?: any;
  page?: any;
  count?: boolean;
}
