<h1>Registration Post-Topics</h1>
<hr/>

<form>
  <p>
    [[post-topics:admin-info]]
    <b style="color:green;">[[post-topics:admin-info-beta]]</b>
  </p><br/>
  <div>
    <p>
      <label for="Width">[[post-topics:admin-width-label]]</label>
      <input type="text" data-field="v-code:width" title="Width" class="form-control"
             placeholder="[[post-topics:admin-width-placeholder]]">
      <br/>
      <label for="Height">[[post-topics:admin-height-label]]</label>
      <input type="text" data-field="v-code:height" title="Height" class="form-control"
             placeholder="[[post-topics:admin-height-placeholder]]">
    </p>
  </div>
</form>

<button class="btn btn-lg btn-primary" id="PostTopics">[[post-topics:admin-save]]</button>

<script>
  $("#PostTopics").on("click", function () {
    $.post("/api/admin/plugins/post-topics", {name:123,data:456},function (res) {
      console.log(res);
    });
  });
</script>
