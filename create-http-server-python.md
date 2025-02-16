# Create an HTTP Server using Python
Codecrafter link: https://app.codecrafters.io/courses/http-server

## Python Socket
Is a low level networking interface. This interface lets you create your own server and specifying the network address:
```py
import socket

'''
  create_server(address, *, family=AF_INET, backlog=None, reuse_port=False, dualstack_ipv6=False)
  - A function which creates a TCP socket bound to address and returns a socket object
  - family: AF_INET or AF_INET6
  - backlog: queue size passed into socket.listen(); default: reasonable value is chosen
  - reuse_port: whether to set the SO_REUSEPORT socket option; default: False
  - dualstack_ipv6: when set to True, and the platform supports it the socket will able to accept IPv4 and IPv6 connections.
'''
server_socket = socket.create_server(("localhost", 8080), reuse_port=True)

'''
  accept()
  - Accepts a connection and returns a value pair (conn, address) where conn is a new socket object usable for sending and receive data, the address is bound to the socket on the other end of the connection
'''
server_socket.accept()
```

## TCP & IP
Internet Protocol (IP) is the address system of the internet. IP is the primary way in which connections are made. It does not handle the packer ordering or error checking, that's where Transport Control Protocol (TCP) comes in.

Puzzle Analogy:
Say, we need to deliever a message in a form of a Puzzle to your friend. Your friend's address is represented as an IP. Each puzzle travels through different postal route.

IP make sure the puzzle pieces arrive at the right address or destination. TCP can be thought as the assembler of the puzzle who puts the pieces together in the right order, asks for missing pieces to be resent, and lets the sender know the puzzle has been received. TCP maintains a connection with the sender from before the first piece is sent and until the final piece.

For example, when an email is sent over TCP, a connection is established and a 3-way handshake is made. First, the source sends an SYN “initial request” packet to the target server in order to start the dialogue. Then the target server sends a SYN-ACK packet to agree to the process. Lastly, the source sends an ACK packet to the target to confirm the process, after which the message contents can be sent. The email message is ultimately broken down into packets before each packet is sent out into the Internet, where it traverses a series of gateways before arriving at the target device where the group of packets are reassembled by TCP into the original contents of the email.
