
<template>
    <div class="container ">
        <div class="row ">
            <div class="col-md-12">
                <div class="card mt-5">
                    <div class="card-header">
                        <h3 class="card-title">Users table</h3>

                        <div class="card-tools">
                            <button class="btn btn-success" data-toggle="modal" data-target="#addNew">Add new<i class="fas fa-user-plus ml-1"></i></button>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th>Registered At</th>
                                <th>Modify</th>
                            </tr>
                            </thead>
                            <tbody>

                            <tr v-for="user in users" :key="user.id">
                                <td>{{user.id}}</td>
                                <td>{{user.name}}</td>
                                <td>{{user.email}}</td>
                                <td>{{user.type | uptext}}</td>
                                <td>{{user.created_at | myDate}}</td>
                                <td>
                                    <a href="#">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                    /
                                    <a href="#">
                                        <i class="fas fa-trash red hovered"></i>
                                    </a>

                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- /.card-body -->
                </div>
                <!-- /.card -->
            </div>
        </div>

        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog " role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add New User</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="createUser">
                        <div class="modal-body">
                            <div class="form-group">
                                <input v-model="form.name" id="name" type="text" name="name" class="form-control" :class="{ 'is-invalid' : form.errors.has('name')}" placeholder ="Name">
                                <has-error :form="form" field="name"></has-error>
                            </div>
                            <div class="form-group">
                                <input v-model="form.email" id="email" type="email" name="email" class="form-control" :class="{ 'is-invalid' : form.errors.has('email')}" placeholder ="Email Address">
                                <has-error :form="form" field="email"></has-error>
                            </div>
                            <div class="form-group">
                                <textarea v-model="form.bio" id="bio" name="bio" class="form-control" :class="{ 'is-invalid' : form.errors.has('bio')}" placeholder ="Short bio for user (optional)"></textarea>
                                <has-error :form="form" field="bio"></has-error>
                            </div>
                            <div class="form-group">
                                <select v-model="form.type" id="type" name="type" class="form-control" :class="{ 'is-invalid' : form.errors.has('type')}">
                                    <option value="">Select User Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">Standard user</option>
                                    <option value="author">Author</option>
                                </select>
                                <has-error :form="form" field="type"></has-error>
                            </div>
                            <div class="form-group">
                                <input v-model="form.password" id="password" type="password" name="password" class="form-control" :class="{ 'is-invalid' : form.errors.has('password')}" placeholder ="Password">
                                <has-error :form="form" field="password"></has-error>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button id="create-btn" type="submit" class="btn btn-success">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    </div>
</template>

<style>
    #create-btn{
        margin-left: 50%;
        transform: translateX(-50%);
        width: 70%;
    }
</style>

<script>
    export default {

        data(){
            return{
                users : {},
                form : new Form({
                    name : '',
                    email : '',
                    password : '',
                    bio : '',
                    type : '',
                    photo : ''
                })
            }
        },

        methods : {
            loadUsers(){
                axios.get('api/user').then(({data}) => (this.users = data.data));
                this.$Progress.finish();
            },
            createUser(){
                this.$Progress.start();
                this.form.post('api/user').then(() => {
                    Fire.$emit('AfterCreate');
                    $('#addNew','','').modal('hide');
                    toast.fire({
                        type: 'success',
                        title : 'User Created Successfully!'
                    });
                    this.$Progress.finish();
                }).catch(() => {
                    this.$Progress.finish();
                    toast.fire({
                        type: 'error',
                        title : 'Please Check your data again !',
                        icon : 'error'
                    });
                });
            }
        },

        created() {
            this.$Progress.start();
            this.loadUsers();
            Fire.$on('AfterCreate', () => {
               this.loadUsers();
            });
            //setInterval(() => this.loadUsers(), 3000);
        }
    }
</script>
