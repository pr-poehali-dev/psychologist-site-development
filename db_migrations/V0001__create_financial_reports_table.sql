CREATE TABLE IF NOT EXISTS financial_reports (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    operation_type VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_financial_reports_date ON financial_reports(date);
CREATE INDEX idx_financial_reports_category ON financial_reports(category);