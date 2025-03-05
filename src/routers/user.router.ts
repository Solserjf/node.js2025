import {Router} from "express";
import {userController} from "../controllers/user.controller";
import {userMiddleware} from "../middlewares/user.middleware";
const router = Router();

export const userRouter = router;
// router.get('/', (req:Request, res:Response) => {//наш обробник//lesson5
//     // console.log(res);
//     // res.send('Hello scubydu!');
//     //request to db to get info
//     // res.json({
//     //     status: 'success',
//     //     name: "sponge bob",
//     //     age: 18,
//     // gender: "male",
//     // })
//     res.json(users);
// })
router.get('/', userController.findAll);//lesson6
// router.post('/', (req:Request, res:Response) => {
// // console.log("POST request to  users");
// // console.log(req.body);
//     const users = req.body;
//     users.push(users);
//     res.status(201).json({message: 'users added successfully'});
// })
router.post('/', userController.create);
// router.put('/:id', (req:Request, res:Response) => {
//     // console.log(req.params.id);
//     const { id } = req.params;
//     const updatedHubkaBob = req.body;
//     users[+id] = updatedHubkaBob;
//     res.status(200).json({message: 'users updated',
//         data: users[+id]});
// })
router.put('/:id', userMiddleware.findByIdOrThrow, userController.updateById);
// router.delete('/:id', (req:Request, res:Response) => {
//     const { id } = req.params;
//     users.splice(+id, 1);
//     res.status(200).json({message: 'users deleted'});
// })
router.delete('/:id', userController.delete);


