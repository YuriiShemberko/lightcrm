import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  TablePagination,
} from '@mui/material';

export interface Column<T> {
  key: string;
  label: string;
  align?: 'right' | 'left' | 'center';
  render?: (row: T) => React.ReactNode;
}

interface ScrollableTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  total?: number;
  page?: number;
  perPage?: number;
  onPageChange?: (page: number) => void;
  title?: string;
  emptyText?: string;
}

function ScrollableTable<T>({
  columns,
  rows,
  total = 0,
  page = 1,
  perPage = 10,
  onPageChange,
  title,
  emptyText = 'Немає даних',
}: ScrollableTableProps<T>) {
  return (
    <Paper>
      {title && (
        <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
          <Typography variant="h6">{title} ({total > 0 ? total : rows.length})</Typography>
        </Box>
      )}
      <TableContainer sx={{ maxHeight: 400, overflowY: 'auto', borderRadius: 0 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.key} align={col.align || 'left'}>
                  <strong>{col.label}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography color="text.secondary" sx={{ py: 3 }}>{emptyText}</Typography>
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, idx) => (
                <TableRow key={(row as any).id || idx} hover>
                  {columns.map((col) => (
                    <TableCell key={col.key} align={col.align || 'left'}>
                      {col.render ? col.render(row) : (row as any)[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {onPageChange && (
        <TablePagination
          component="div"
          count={total}
          rowsPerPage={perPage}
          rowsPerPageOptions={[]}
          labelRowsPerPage=""
          page={page - 1}
          onPageChange={(_, page) => onPageChange(page + 1)}
        />
      )}
    </Paper>
  );
}

export default ScrollableTable;
