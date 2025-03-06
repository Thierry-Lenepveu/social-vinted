import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Service = {
  id: number;
  date: string;
  title: string;
  description: string;
  category_id: number;
  user_id: number;
};

class ServiceRepository {
  // The C of CRUD - Create operation

  async create(service: Omit<Service, "id">) {
    const date = new Date(service.date);

    // Execute the SQL INSERT query to add a new service to the "service" table
    const [result] = await databaseClient.query<Result>(
      "insert into service (date, title, description, category_id, user_id) values (?, ?, ?, ?, ?)",
      [
        date.toISOString().slice(0, 19).replace("T", " "),
        service.title,
        service.description,
        service.category_id,
        service.user_id,
      ],
    );

    // Return the ID of the newly inserted service
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific service by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from service where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the service
    return rows[0] as Service;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all services from the "service" table
    const [rows] = await databaseClient.query<Rows>("select * from service");

    // Return the array of users
    return rows as Service[];
  }

  // The U of CRUD - Update operation
  async update(service: Service) {
    const date = new Date(service.date);

    const [result] = await databaseClient.query<Result>(
      "update service set date = ?, title = ?, description = ?, category_id = ?, user_id = ? where id = ?",
      [
        date.toISOString().slice(0, 19).replace("T", " "),
        service.title,
        service.description,
        service.category_id,
        service.user_id,
        service.id,
      ],
    );

    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove a service by its ID

  async delete(id: number) {
    await databaseClient.query<Rows>("DELETE FROM service WHERE id = ?", [id]);
  }
}

export default new ServiceRepository();
