import databaseClient from "../../../../database/client";

import type { Result, Rows } from "../../../../database/client";

type ServiceCategory = {
  id: number;
  name: string;
};

class ServiceCategoryRepository {
  // The C of CRUD - Create operation
  async create(serviceCategory: Omit<ServiceCategory, "id">) {
    // Execute the SQL INSERT query to insert a new service category into the "service_category" table
    const [result] = await databaseClient.query<Result>(
      "insert into service_category (name) values (?)",
      [serviceCategory.name],
    );

    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific service category by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from service_category where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the service category
    return rows[0] as ServiceCategory;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all service categories from the "service_category" table
    const [rows] = await databaseClient.query<Rows>(
      "select * from service_category",
    );

    // Return the array of users
    return rows as ServiceCategory[];
  }

  // The U of CRUD - Update operation
  async update(serviceCategory: ServiceCategory) {
    // Execute the SQL UPDATE query to update the service category by its ID
    const [result] = await databaseClient.query<Result>(
      "update service_category set name = ? where id = ?",
      [serviceCategory.name, serviceCategory.id],
    );

    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id: number) {
    // Execute the SQL DELETE query to remove the service category by its ID
    const [result] = await databaseClient.query<Result>(
      "delete from service_category where id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new ServiceCategoryRepository();
