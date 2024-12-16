/**
 * 返回集合VO
 */
export interface List<T> {
    /**
     * 数据
     */
    data: {
        /**
         * 数据集合
         */
        list: T[],
        /**
         * 当前页码
         */
        pageNum: number,
        /**
         * 总页数
         */
        pages: number,
        /**
         * 总数据量
         */
        total: number,
        /**
         * 每页条数
         */
        pageSize: number,
        /**
         * 是否最后一页
         */
        last: boolean
    },
    /**
     * 消息
     */
    msg: string,
    /**
     * 状态码
     */
    code: number
}
/**
 * 返回对象
 */
export interface Data<T> {
    /**
     * 数据
     */
    data: T,
    /**
     * 消息
     */
    msg: string,
    /**
     * 状态码
     */
    code: number
}
/**
 * 联合类型
 */
export type R<T> = List<T> & Data<T>
