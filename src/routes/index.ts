import cors from "cors";
import { Router } from "express";
import { container } from "../infra/DI/container";
import { UserController } from "../controller";
import { ZodError } from "zod";
import { CreateUserValidator } from "../utils/validator";

const router = Router();
router.use(cors());

const userController = container.get<UserController>("UserController");

router.get("/health", (_, res) => {
  res
    .status(200)
    .json({ status: "ok teste de log", timestamp: new Date().toISOString() });
});

router.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const formatedId = parseInt(id, 10);

    if (Number.isNaN(formatedId))
      return res
        .status(400)
        .json({ message: "Obrigatório o envio de ID do usuário" });

    const user = await userController.findUser(formatedId);

    res
      .status(200)
      .json({ message: "Usuário encontrado com sucesso!", response: user });
  } catch (error: any) {
    if (error.isCustomError) {
      return res.status(error.status).json({ message: error.message });
    }
    res.status(500).json({
      message: "Erro deconhecido ao buscar cliente",
      error: `error => ${error}`,
    });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await userController.getUsers();

    res
      .status(200)
      .json({ message: "Usuários encontrados com sucesso!", response: users });
  } catch (error: any) {
    if (error.isCustomError) {
      return res.status(error.status).json({ message: error.message });
    }
    res.status(500).json({
      message: "Erro deconhecido ao buscar cliente",
      error: `error => ${error}`,
    });
  }
});

router.post("/user", async (req, res) => {
  try {
    const body = req.body;
    const validateUser = CreateUserValidator.validate(body);

    const user = await userController.createUser(validateUser);
    res
      .status(201)
      .json({ message: "Usuário criado com sucesso!", response: user });
  } catch (error: any) {
    if (error.isCustomError) {
      return res.status(error.status).json({ message: error.message });
    } else if (error instanceof ZodError) {
      return res
        .status(400)
        .json({ message: "Erro de validação", error: error.message });
    }

    res.status(500).json({ message: "Erro ao criar cliente" });
  }
});

router.patch("/user/:id", async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const formatedId = parseInt(id, 10);

    if (Number.isNaN(formatedId))
      return res
        .status(400)
        .json({ message: "Obrigatório o envio de ID do usuário" });

    const user = await userController.updateUser(formatedId, body);
    res
      .json(200)
      .json({ message: "Cliente atualizado com sucesso", response: user });
  } catch (error: any) {
    if (error.isCustomError) {
      return res.status(error.status).json({ message: error.message });
    }
    res.status(500).json({
      message: "Erro deconhecido ao buscar cliente",
      error: `error => ${error}`,
    });
  }
});

router.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const formatedId = parseInt(id, 10);

    if (Number.isNaN(formatedId))
      return res
        .status(400)
        .json({ message: "Obrigatório o envio de ID do usuário" });

    await userController.deleteUser(formatedId);
    res.status(204).json({ message: "Usuário inativado com sucesso!" });
  } catch (error: any) {
    if (error.isCustomError) {
      return res.status(error.status).json({ message: error.message });
    }
    res.status(500).json({
      message: "Erro deconhecido ao buscar cliente",
      error: `error => ${error}`,
    });
  }
});

export const routes = router;
