import databaseClient, { type Result } from "../../../database/client";

import type { Rows } from "../../../database/client";

type Condition = {
  id: number;
  name: string;
};

class DonationConditionRepository {
  // The C of CRUD - Create operation
  async create(condition: Omit<Condition, "id">) {
    // Execute the SQL INSERT query to insert a new condition category into the "condition" table
    const [result] = await databaseClient.query<Result>(
      "insert into donation_condition (name) values (?)",
      [condition.name],
    );
    return result.insertId;
  }

  // The Rs of CRUD - Read operations
  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific condition by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from donation_condition where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the condition
    return rows[0] as Condition;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all condition categories from the "conditiony" table
    const [rows] = await databaseClient.query<Rows>(
      "select * from donation_condition",
    );

    // Return the array of users
    return rows as Condition[];
  }

  // The U of CRUD - Update operation
  async update(condiion: Condition) {
    // Execute the SQL UPDATE query to update the condition category by its ID
    const [result] = await databaseClient.query<Result>(
      "update donation_condition set name = ? where id = ?",
      [condiion.name, condiion.id],
    );

    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id: number) {
    // Execute the SQL DELETE query to remove the condition category by its ID
    const [result] = await databaseClient.query<Result>(
      "delete from donation_condition where id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new DonationConditionRepository();
