const ReviewHeader = ({ sortOrder, setSortOrder }) => {
  return (
    <div className="review-header">
      <div className="title">Đánh giá của khách</div>
      <div className="sort-dropdown">
        <label htmlFor="sort">Sắp xếp đánh giá theo:</label>
        <select id="sort" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
        </select>
      </div>
    </div>
  );
};

export default ReviewHeader;
