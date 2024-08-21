export interface IpaginationController {
    page?: number,
    limit?: number,
    where?: any,
    select?: any,
    include?: any,
    orderBy?: any
    skip?: any
    take?: any
}