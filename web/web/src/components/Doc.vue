<template>
    <div class="doc">
        <h2>bpcode 工具使用说明</h2>
        <ol>
            <li>
                <strong>服务端配置（必须先配置）</strong>
                <ul>
                    <li>
                        在服务器用户目录下新建 <code>.env</code> 文件，内容示例：
                    <pre>
    BPCODE=你的密码
    BPATH=你的代码备份路径
                    </pre>
                        <p>
                            <strong>BPCODE</strong>：设置密码，只是为了防止误上传到他人服务器，现在反正也没什么人用，以后再说叭<br>
                            <strong>BPATH</strong>：必填，指定代码备份存储路径。
                        </p>
                    </li>
                    <li>
                        安装 bpcode 并启动服务端：
                        <pre>pip install bpcode</pre>
                        <pre>bpserver</pre>
                        <pre>ufw allow 8888(ubuntu)总之自己开防火墙端口就行</pre>
                    </li>
                </ul>
            </li>
            <li>
                <strong>客户端使用</strong>
                <ul>
                    <li>
                        在你的代码中添加如下内容（以 Python 为例）：
                        <pre>
                from bpcode import backup
                a = backup.AutoBackUp("你的密码", "http://服务器IP")
                        </pre>
                    </li>
                    <li>
                        <pre>
                如何下载？
                安装完成后在终端输入 
                <code>
                    bpdown --name 项目名称 --version 版本 --password 密码 --host 服务器IP
                </code>
                        </pre>
                    </li>
                    <li>
                <pre>
                    0.4.0 以后新增nas，可以在树莓派，玩客云等设备上使用，备份服务器代码
                    只需要在树莓派输入
                    bpnas
                    即可自动备份，打开http://服务器IP:8888/登录即可查看nas状态
                </pre>
                    </li>
                    <li>
                        支持自动备份 <code>.py</code>、<code>.pyc</code>、<code>.pt</code>、<code>.pth</code> 等文件，修改后服务器自动同步版本。
                    </li>
                    <li>
                        如有需要，可回退代码版本，类似于简易版的 git。
                    </li>
                </ul>
            </li>
            <li>
                <strong>工具作用</strong>
                <ul>
                    <li>
                        解决深度学习开发中代码频繁拷贝、同步不及时、易丢失的问题。
                    </li>
                    <li>
                        只需配置一次服务器，后续代码自动备份，无需手动操作。
                    </li>
                </ul>
            </li>
            <li>
                <strong>注意事项</strong>
                <ul>
                    <li>
                        本工具安全性有限，不建议用于敏感项目。
                        接单，商务合作请联系微信：15035624220
                    </li>
                </ul>
            </li>
        </ol>
    </div>
</template>

<style scoped>
.doc {
    padding: 24px;
    font-size: 16px;
}
pre {
    background: #f6f8fa;
    padding: 8px;
    border-radius: 4px;
    overflow-x: auto;
}
code {
    background: #f6f8fa;
    padding: 2px 4px;
    border-radius: 3px;
}
</style>
