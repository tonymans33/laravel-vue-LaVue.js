
<template>
    <div class="container ">
        <div class="row ">
            <div class="col-md-12">
                <div class="card mt-5">
                    <div class="card-header">
                        <h3 class="card-title">Users table</h3>

                        <div class="card-tools">
                            <button class="btn btn-success" @click="newModal">Add new<i class="fas fa-user-plus ml-1"></i></button>
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
                                    <a href="#" @click="editModal(user)">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                    /
                                    <a href="#" @click="deleteUser(user.id)">
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
                        <h5 class="modal-title" v-show="!editmode" id="exampleModalLabel">Add New User</h5>
                        <h5 class="modal-title" v-show="editmode" id="exampleModalLabel2" >Update User Data</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="editmode ? updateUser() : createUser()">
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
                            <button id="ce-bt" s v-show="editmode" type="submit" class="btn btn-success">Update</button>
                            <button id="ce-bt"  v-show="!editmode" type="submit" class="btn btn-success ">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    export default {

        data(){
            return{
                editmode : false,
                users : {},
                form : new Form({
                    id : '',
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
            updateUser(){
                this.form.put('api/user/'+this.form.id).then(() =>{
                    this.$Progress.start();
                    deletedSwal.fire(
                        'Updated!',
                        'User Data Updated Successfully !',
                        'success'
                    );
                    $('#addNew','','').modal('hide');
                    this.$Progress.finish();
                    Fire.$emit('AfterCreate');
                }).catch(() => {
                    this.$Progress.fail();
                });
            },

            newModal(){
                this.editmode = false;
                this.form.reset();
                $('#addNew','','').modal('show');
            },

            editModal(user){
                this.editmode = true;
                this.form.reset();
                $('#addNew','','').modal('show');
                this.form.fill(user);
            },

            deleteUser(id){
                deleteSwal.fire({
                    title: 'Are you sure you want to delete this user ?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {

                    this.form.delete('api/user/'+id).then(() => {
                        this.$Progress.start();
                        if (result.value) {
                            deletedSwal.fire(
                                'Deleted!',
                                'User Deleted Successfully !',
                                'success'
                            );
                            Fire.$emit('AfterCreate');
                        }
                        this.$Progress.finish();
                    }).catch(() => {

                    });
                })
            },

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
                        title : 'User Created Successfully!',
                        toast : true,
                        position :'top-end',
                        showConfirmButton : false,
                        icon: 'success',
                        timer : 3000
                    });
                    this.$Progress.finish();
                }).catch(() => {
                    this.$Progress.fail();
                    toast.fire({
                        type: 'error',
                        title : 'Please Check your data again !',
                        icon : 'error',
                        toast : true,
                        position :'top-end',
                        showConfirmButton : false,
                        timer : 3000
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
