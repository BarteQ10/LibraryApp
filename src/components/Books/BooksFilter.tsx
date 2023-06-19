import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { ArrowUp, ArrowDown } from 'react-bootstrap-icons'; 

interface BooksFilterProps {
  onFilterChange: (filterKey: "title" | "genre" | "author" | null, filterValue: string) => void;
  onSortChange: (sortKey: "title" | "genre" | "author" | null, sortOrder: "asc" | "desc") => void;
}

const BooksFilter: React.FC<BooksFilterProps> = ({ onFilterChange, onSortChange }) => {
  const [filterKey, setFilterKey] = useState<"title" | "genre" | "author" | null>(null);
  const [filterValue, setFilterValue] = useState("");
  const [sortKey, setSortKey] = useState<"title" | "genre" | "author" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleFilterKeyChange = (e: React.ChangeEvent<HTMLElement>) => {
    const newFilterKey = (e.target as HTMLSelectElement).value as "title" | "genre" | "author" | null;
    setFilterKey(newFilterKey);
    onFilterChange(newFilterKey, filterValue);
  };

  const handleFilterValueChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setFilterValue(target.value);
    onFilterChange(filterKey, target.value);
  };

  const handleSortKeyChange = (e: React.ChangeEvent<HTMLElement>) => {
    const newSortKey = (e.target as HTMLSelectElement).value as "title" | "genre" | "author" | null;
    setSortKey(newSortKey);
    onSortChange(newSortKey, sortOrder);
  };

  const handleSortOrderChange = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    onSortChange(sortKey, newOrder);
  };

  return (
    <Row className="mb-4">
      <Col xs={12} sm={4} className="mb-2">
        <Form.Control
          type="text"
          placeholder="Filter value"
          value={filterValue}
          onChange={handleFilterValueChange}
        />
      </Col>
      <Col xs={12} sm={4} className="mb-2">
        <Form.Control as="select" value={filterKey || ''} onChange={handleFilterKeyChange} className="arrow-select">
          <option value="">Filter By...</option>
          <option value="title">Title</option>
          <option value="genre">Genre</option>
          <option value="author">Author</option>
        </Form.Control>
      </Col>
      <Col xs={12} sm={4} className="mb-2 d-flex align-items-center justify-content-sm-start justify-content-center">
        <Form.Control as="select" value={sortKey || ''} onChange={handleSortKeyChange} className="arrow-select me-2">
          <option value="">Sort By...</option>
          <option value="title">Title</option>
          <option value="genre">Genre</option>
          <option value="author">Author</option>
        </Form.Control>
        <Button variant="outline-primary" onClick={handleSortOrderChange}>
          {sortOrder === 'asc' ? <ArrowUp /> : <ArrowDown />}
        </Button>
      </Col>
    </Row>
  );
};

export default BooksFilter;
