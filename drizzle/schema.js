import { pgTable, serial, text, timestamp, date, uuid, integer } from 'drizzle-orm/pg-core';

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(),
  name: text('name'),
  role: text('role').notNull().default('employee'),
  leaveBalance: integer('leave_balance').default(20),
});

export const leaves = pgTable('leaves', {
  id: serial('id').primaryKey(),
  employeeId: uuid('employee_id').references(() => profiles.id),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  type: text('type').notNull(),
  comment: text('comment'),
  status: text('status').notNull().default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});