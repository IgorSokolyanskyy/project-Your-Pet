export const selectNotices = state => state.notices.items;
export const selectTotalPages = state => state.notices.totalPages;
export const selectIsNoticeLoading = state => state.notices.isLoading;
export const selectCategory = state => state.notices.category;

export const selectIsNoticeItemLoading = state => state.noticeItem.isLoading;
export const selectNoticeItem = state => state.noticeItem.item;
